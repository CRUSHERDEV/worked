"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ordersApi } from "@/lib/api/client";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";
import { Button } from "@/components/forms/Button";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getOrder(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Failed to load order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <p className="text-gray-500">Order not found</p>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Continue Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your order. We've received your order and will begin processing it soon.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.total?.toFixed(2) || "0.00"}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

