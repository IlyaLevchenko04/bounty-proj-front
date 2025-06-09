import { Link } from "@tanstack/react-router";

export const LandingPage = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
          Bounty Hunter Portal
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your gateway to the galaxy's most dangerous and rewarding bounties.
          Track targets, collect rewards, and make your mark in the universe.
        </p>
        <div className="space-x-4">
          <Link
            to="/bounty"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View Bounties
          </Link>
          <Link
            to="/bounty/create"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Post Bounty
          </Link>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <div className="bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">
              Track Targets
            </h3>
            <p className="text-gray-300">
              Access detailed information about your targets, their last known
              locations, and valuable intel.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">
              Collect Rewards
            </h3>
            <p className="text-gray-300">
              Earn credits for successful captures. The more dangerous the
              target, the higher the reward.
            </p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-yellow-400">
              Build Reputation
            </h3>
            <p className="text-gray-300">
              Establish your name in the bounty hunting community and take on
              more challenging missions.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© 2025 Bounty Hunter Portal. All rights reserved.</p>
      </div>
    </footer>
  </div>
);
