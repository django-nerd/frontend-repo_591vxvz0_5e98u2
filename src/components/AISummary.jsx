import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

export default function AISummary({ medicines }) {
  const [summary, setSummary] = useState("");
  const [adherence, setAdherence] = useState(0);

  useEffect(() => {
    if (!medicines.length) {
      setSummary("No medicines yet. Add a few to see insights.");
      setAdherence(0);
      return;
    }
    const total = medicines.length;
    const taken = medicines.filter((m) => m.taken).length;
    const pct = Math.round((taken / Math.max(total, 1)) * 100);
    setAdherence(pct);

    const overdue = medicines.filter((m) => !m.taken);
    const names = overdue.map((m) => m.name).join(", ");
    const s = pct >= 80
      ? `Great job! Your adherence is ${pct}%. Keep it up.`
      : `Adherence is ${pct}%. Consider taking: ${names || "all set"}.`;
    setSummary(s);
  }, [medicines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/60"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">AI Summary</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">Quick insights for today</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 p-2 text-white">
          <Brain className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600"
                style={{ width: `${adherence}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200">
              <span>Adherence</span>
              <span>{adherence}%</span>
            </div>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          <Sparkles className="h-4 w-4" />
          <span>{summary}</span>
        </div>
      </div>
    </motion.div>
  );
}
