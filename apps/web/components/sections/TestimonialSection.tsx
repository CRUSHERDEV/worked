"use client";

import { motion } from "framer-motion";

export function TestimonialSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-8 aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200/50 to-accent-200/50 rounded-3xl blur-2xl -z-10" />
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">NB</span>
                  </div>
                  <p className="text-lg font-semibold">Nikolas Beaudin</p>
                  <p className="text-sm opacity-90">Product Manager</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-primary-50 rounded-3xl p-8 lg:p-12 relative">
              <svg
                className="w-16 h-16 text-primary-200 absolute top-6 left-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <div className="relative z-10 pt-8">
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-primary-200 text-primary-800 text-sm font-semibold rounded-full mb-4">
                    SAMSUNG
                  </div>
                </div>
                
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "Linked All has transformed how we understand and serve our
                  African market. The platform's analytics and user feedback
                  tools have been invaluable in making data-driven decisions
                  that resonate with our customers."
                </p>
                
                <div>
                  <p className="font-semibold text-dark">Nikolas Beaudin</p>
                  <p className="text-gray-600">Product Design Manager | Samsung Ads</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

