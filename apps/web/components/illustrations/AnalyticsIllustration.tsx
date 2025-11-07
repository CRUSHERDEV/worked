"use client";

import { motion } from "framer-motion";

export function AnalyticsIllustration() {
  const bars = [
    { height: 60, delay: 0.1, color: "from-primary-500 to-primary-600" },
    { height: 80, delay: 0.2, color: "from-accent-500 to-accent-600" },
    { height: 45, delay: 0.3, color: "from-secondary-500 to-secondary-600" },
    { height: 90, delay: 0.4, color: "from-primary-500 to-primary-600" },
    { height: 70, delay: 0.5, color: "from-accent-500 to-accent-600" },
  ];

  return (
    <div className="relative w-full h-full">
      <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-8 shadow-xl">
        {/* Heatmap card */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white font-semibold mb-4">Heatmap</h3>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-8 rounded"
                style={{
                  background: `linear-gradient(135deg, ${
                    i % 4 === 0 || i % 4 === 3
                      ? "rgba(239, 68, 68, 0.8)"
                      : i % 4 === 1
                      ? "rgba(245, 158, 11, 0.6)"
                      : "rgba(34, 197, 94, 0.4)"
                  })`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Success score */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-4xl font-bold text-white mb-2">93%</div>
            <div className="text-white/80 text-sm">Task Success</div>
          </motion.div>

          {/* Bar chart */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4 text-sm">
              Time on Task
            </h3>
            <div className="flex items-end justify-between gap-2 h-20">
              {bars.map((bar, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t bg-white/20 rounded-t"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${bar.height}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: bar.delay }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

