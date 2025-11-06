import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Tag } from "lucide-react";

const initialForm = {
  name: "",
  dosage: "",
  frequency: "",
  compartmentTag: "",
};

export default function MedicineForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.compartmentTag) return;
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm(initialForm);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div className="mb-3">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Medicine name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-100"
          placeholder="e.g., Metformin"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Dosage</label>
          <input
            value={form.dosage}
            onChange={(e) => setForm({ ...form, dosage: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-100"
            placeholder="500mg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Frequency</label>
          <input
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-100"
            placeholder="2x/day"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Tag className="h-4 w-4" /> NFC Tag UID
          </label>
          <input
            value={form.compartmentTag}
            onChange={(e) => setForm({ ...form, compartmentTag: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-600 dark:bg-slate-900/50 dark:text-slate-100"
            placeholder="Scan or paste NFC UID"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-sky-600 px-4 py-2 font-medium text-white shadow hover:shadow-md"
        >
          <Plus className="h-4 w-4" /> Add medicine
        </button>
      </div>
    </motion.form>
  );
}
