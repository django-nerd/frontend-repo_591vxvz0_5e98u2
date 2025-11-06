import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Pill, Info } from "lucide-react";

export default function CompartmentGrid({ items, onToggleTaken, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence>
        {items.map((m) => {
          const taken = m.taken;
          return (
            <motion.button
              key={m.id}
              layout
              onClick={() => onSelect(m)}
              whileHover={{ y: -2 }}
              className={`group relative overflow-hidden rounded-2xl border p-4 text-left shadow-sm transition ${
                taken
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-slate-200 bg-white/70"
              }`}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-teal-200/40 via-sky-200/30 to-indigo-200/20" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-gradient-to-br from-teal-500 to-sky-600 p-2 text-white">
                      <Pill className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-600">{m.dosage} • {m.frequency}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500">Tag {m.compartmentTag}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onToggleTaken(m.id); }}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      taken
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
                        : "border-slate-300 bg-white/70 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {taken ? "Taken" : "Mark taken"}
                  </button>
                </div>
                {taken && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Logged just now</span>
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-2 right-2 opacity-0 transition group-hover:opacity-100">
                  <div className="inline-flex items-center gap-1 rounded-full bg-sky-600/10 px-2 py-1 text-[10px] font-medium text-sky-700">
                    <Info className="h-3 w-3" /> Details
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
