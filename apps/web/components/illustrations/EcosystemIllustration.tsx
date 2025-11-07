"use client";

import { motion } from "framer-motion";

export function EcosystemIllustration() {
  const nodes = [
    { x: 150, y: 150, label: "Vendors", color: "#0066FF", icon: "V" },
    { x: 450, y: 150, label: "Consumers", color: "#F5B800", icon: "C" },
    { x: 150, y: 450, label: "Logistics", color: "#00C2A8", icon: "L" },
    { x: 450, y: 450, label: "Payments", color: "#F5B800", icon: "P" },
  ];

  return (
    <div className="relative w-full h-full max-w-2xl mx-auto">
      {/* Background gradient circle */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full blur-3xl opacity-50 -z-10" />
      
      {/* Main illustration */}
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#00C2A8" />
          </linearGradient>
        </defs>

        {/* Central hub */}
        <motion.circle
          cx="300"
          cy="300"
          r="80"
          fill="url(#gradient1)"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        {/* Connection nodes */}
        {nodes.map((node, index) => (
          <g key={index}>
            {/* Connection lines */}
            <motion.line
              x1={300}
              y1={300}
              x2={node.x}
              y2={node.y}
              stroke={node.color}
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            />
            
            {/* Node circles */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="40"
              fill={node.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            />
            
            {/* Node icons */}
            <motion.text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
            >
              {node.icon}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}

