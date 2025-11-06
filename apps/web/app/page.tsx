export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-display font-bold text-dark mb-6">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Linked All
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A pan-African, multi-vertical digital ecosystem that connects consumers, vendors,
            producers, logistics and financial services in one platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary"
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
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Marketplace</h3>
              <p className="text-gray-600">
                Discover and purchase from thousands of verified vendors across Africa
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-secondary-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">LinkedPay Wallet</h3>
              <p className="text-gray-600">
                Secure payments with multiple options including mobile money and LinkedCoin
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Smart Logistics</h3>
              <p className="text-gray-600">
                Real-time tracking and reliable delivery across multiple carriers
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-display font-bold mb-4">
              Project Status: Phase 0 - MVP Development
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                ✓ Monorepo Setup
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                ✓ Type System
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                ✓ Design System
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                → Next.js App
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                Expo Mobile
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                Backend Services
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
