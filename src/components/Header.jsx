import { useState } from "react";
import { motion } from "framer-motion";
import { Pill, ShieldCheck, Settings, ContactlessPayment } from "lucide-react";

export default function Header({ onOpenSettings, onScan }) {
  const [scanning, setScanning] = useState(false);

  const startScan = async () => {
    try {
      if (!("NDEFReader" in window)) {
        alert("Web NFC is not supported in this browser.");
        return;
      }
      setScanning(true);
      const reader = new window.NDEFReader();
      await reader.scan();
      reader.onreading = (event) => {
        const serial = event.serialNumber || "unknown";
        onScan?.(serial);
        setScanning(false);
      };
      reader.onerror = () => {
        setScanning(false);
        alert("Scan error. Try again.");
      };
    } catch (e) {
      setScanning(false);
      alert(e.message || "Scan failed");
    }
  };

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-sky-500 to-indigo-600 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 p-2 text-white shadow-lg">
                <Pill className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Smart Pill Box
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  NFC-enabled medication assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={startScan}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 font-medium text-white shadow hover:bg-sky-700"
              >
                <ContactlessPayment className="h-4 w-4" />
                {scanning ? "Scanning..." : "Scan Tag"}
              </button>
              <span className="hidden items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 md:flex">
                <ShieldCheck className="h-4 w-4" /> HIPAA-friendly UI
              </span>
              <button
                onClick={onOpenSettings}
                className="rounded-lg bg-white/70 px-3 py-2 text-slate-700 shadow hover:bg-white hover:shadow-md dark:bg-slate-800/60 dark:text-slate-100"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
