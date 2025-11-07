"use client";

import { motion } from "framer-motion";

export function MarketplaceIllustration() {
  return (
    <div className="relative w-full h-full">
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 shadow-xl">
        {/* Card 1: Product Stats */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg mb-4"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Product Views</h3>
            <div className="text-2xl font-bold text-primary-600">83%</div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: 0 }}
              whileInView={{ width: "83%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Card 2: Feature Feedback */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-semibold text-gray-800 mb-4">
            Is this feature valuable?
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-medium">YES</span>
              <span className="text-gray-600 font-semibold">67%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                whileInView={{ width: "67%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-600 font-medium">NO</span>
              <span className="text-gray-600 font-semibold">33%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                whileInView={{ width: "33%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

