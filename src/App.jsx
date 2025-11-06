import { useMemo, useState } from "react";
import Header from "./components/Header";
import MedicineForm from "./components/MedicineForm";
import NFCScanner from "./components/NFCScanner";
import CompartmentGrid from "./components/CompartmentGrid";
import AISummary from "./components/AISummary";

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [medicines, setMedicines] = useState(() => {
    const raw = localStorage.getItem("medicines");
    return raw ? JSON.parse(raw) : [];
  });

  const save = (next) => {
    setMedicines(next);
    localStorage.setItem("medicines", JSON.stringify(next));
  };

  const handleAdd = (m) => {
    save([...medicines, { ...m, taken: false }]);
  };

  const handleToggleTaken = (id) => {
    const next = medicines.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m));
    save(next);
  };

  const handleDetectTag = (uid) => {
    // if a medicine with this tag exists, mark as taken, else prefill form
    const existing = medicines.find((m) => m.compartmentTag === uid);
    if (existing) {
      handleToggleTaken(existing.id);
    } else {
      alert(`Tag ${uid} not assigned. Add a medicine and use this UID.`);
    }
  };

  const selectedCount = useMemo(() => medicines.filter((m) => m.taken).length, [medicines]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-teal-50 to-indigo-50 text-slate-900">
      <Header onOpenSettings={() => setOpenSettings(true)} />

      <main className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-white/60 p-6 shadow-sm backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your compartments</h2>
                <span className="text-sm text-slate-600">{selectedCount} taken</span>
              </div>
              <CompartmentGrid
                items={medicines}
                onToggleTaken={handleToggleTaken}
                onSelect={(m) => alert(`${m.name} — ${m.dosage} (${m.frequency})`)}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <MedicineForm onAdd={handleAdd} />
              <NFCScanner onDetect={handleDetectTag} />
            </div>
          </div>

          <div className="space-y-6">
            <AISummary medicines={medicines} />

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Tips</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                <li>Tap a compartment to view details</li>
                <li>Scan an NFC tag to mark assigned medicine as taken</li>
                <li>Use consistent tags per compartment for accurate logs</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {openSettings && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-6" onClick={() => setOpenSettings(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="mt-2 text-sm text-slate-600">More configuration coming soon.</p>
            <div className="mt-4 flex justify-end">
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-white" onClick={() => setOpenSettings(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
