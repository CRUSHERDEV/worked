"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MarketplaceIllustration } from "../illustrations/MarketplaceIllustration";
import { AnalyticsIllustration } from "../illustrations/AnalyticsIllustration";

interface FeatureSectionProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
  reverse?: boolean;
  learnMoreHref?: string;
}

export function FeatureSection({
  title,
  description,
  illustration,
  reverse = false,
  learnMoreHref = "#",
}: FeatureSectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            reverse ? "lg:grid-flow-dense" : ""
          }`}
        >
          <motion.div
            className={reverse ? "lg:col-start-2" : ""}
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {description}
            </p>
            <Link
              href={learnMoreHref}
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
            >
              Learn more
              <svg
                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            className={reverse ? "lg:col-start-1 lg:row-start-1" : ""}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {illustration}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <>
      <FeatureSection
        title="Give your users a voice"
        description="Empower your customers to share feedback, rate products, and influence your business decisions. Build products and services that truly resonate with your African market through real-time user insights and analytics."
        illustration={<MarketplaceIllustration />}
        learnMoreHref="#features"
      />
      <FeatureSection
        title="Make data-driven decisions"
        description="Transform customer responses into actionable insights. Use advanced analytics, heatmaps, and user behavior tracking to understand what works and what doesn't. Green light your boldest ideas with confidence backed by real data."
        illustration={<AnalyticsIllustration />}
        reverse
        learnMoreHref="#analytics"
      />
    </>
  );
}

