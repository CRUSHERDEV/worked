"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AuthNavigation } from "../../components/navigation/AuthNavigation";
import { LoadingSpinner } from "../../components/loading/LoadingSpinner";
import { getCurrentUser } from "../../lib/supabase";

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  icon,
  trend,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
          {icon}
        </div>
        {change && (
          <span
            className={`text-sm font-semibold ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? "↑" : "↓"} {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-dark mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </motion.div>
  );
}

// Chart Component (Simple Bar Chart)
function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-dark mb-4">Recent Activity</h3>
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end h-full">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.value / maxValue) * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg min-h-[20px]"
              />
            </div>
            <span className="text-xs text-gray-600 mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Line Chart Component (Simple)
function LineChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  const points = data.map(
    (item, index) =>
      `${(index * 100) / (data.length - 1)},${100 - (item.value / maxValue) * 100}`
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-dark mb-4">Revenue Trend</h3>
      <div className="h-32 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.polyline
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            points={points.join(" ")}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#00C2A8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-xs text-gray-600">
        {data.map((item, index) => (
          <span key={index}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push("/login");
        return;
      }
      setUser(currentUser);
    } catch (error) {
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Total Orders",
      value: "127",
      change: "12%",
      trend: "up" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      change: "8%",
      trend: "up" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Active Products",
      value: "48",
      change: "5%",
      trend: "up" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "Customers",
      value: "1,234",
      change: "15%",
      trend: "up" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  const barChartData = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 62 },
    { label: "Wed", value: 38 },
    { label: "Thu", value: 71 },
    { label: "Fri", value: 55 },
    { label: "Sat", value: 48 },
    { label: "Sun", value: 67 },
  ];

  const lineChartData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 55 },
    { label: "Mar", value: 45 },
    { label: "Apr", value: 70 },
    { label: "May", value: 65 },
    { label: "Jun", value: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavigation />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-dark mb-2">
            Welcome back, {user.email?.split("@")[0] || "User"}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <BarChart data={barChartData} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <LineChart data={lineChartData} />
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-dark">Recent Orders</h3>
            <button className="text-primary-600 text-sm font-semibold hover:text-primary-700">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">#{item}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Order #{1000 + item}</p>
                    <p className="text-sm text-gray-600">2 items · ₦{(item * 5000).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    Delivered
                  </span>
                  <p className="text-sm text-gray-600 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

