import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContactlessPayment } from "lucide-react";

// Web NFC is experimental: this component gracefully falls back to manual entry
export default function NFCScanner({ onDetect }) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState("Idle");

  useEffect(() => {
    setSupported("NDEFReader" in window);
  }, []);

  const startScan = async () => {
    try {
      if (!("NDEFReader" in window)) {
        setStatus("NFC not supported in this browser");
        return;
      }
      const reader = new window.NDEFReader();
      await reader.scan();
      setStatus("Hold your tag near the device...");
      reader.onreading = (event) => {
        const serial = event.serialNumber || "unknown";
        onDetect(serial);
        setStatus(`Detected tag: ${serial}`);
      };
      reader.onerror = () => setStatus("Scan error. Try again.");
    } catch (e) {
      setStatus(e.message || "Scan failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Scan NFC Tag</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {supported ? "Use a compatible device and browser" : "Web NFC unsupported; paste UID manually"}
          </p>
        </div>
        <ContactlessPayment className="h-6 w-6 text-sky-600" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={startScan}
          className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white shadow hover:bg-sky-700"
        >
          Start scan
        </button>
        <span className="text-sm text-slate-600 dark:text-slate-300">{status}</span>
      </div>
    </motion.div>
  );
}
