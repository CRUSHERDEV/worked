"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-200 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
            </div>
            <span className="text-xl lg:text-2xl font-display font-bold text-dark">
              Linked All
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="#platform"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Platform
            </Link>
            <Link
              href="#solutions"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#resources"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Resources
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-white border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Get started free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 space-y-2"
            >
              <Link
                href="/products"
                className="block py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#platform"
                className="block py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Platform
              </Link>
              <Link
                href="#solutions"
                className="block py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Solutions
              </Link>
              <Link
                href="#resources"
                className="block py-2 text-gray-600 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/cart"
                className="block py-2 text-gray-600 hover:text-primary-600 flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </Link>
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/login"
                  className="block py-2 text-gray-600 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 px-4 bg-primary-500 text-white rounded-lg text-center font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get started free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

