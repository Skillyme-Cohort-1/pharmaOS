import Layout from "../components/layout/Layout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">User Profile</h1>
            <p className="text-gray-500 mt-1">Manage your account and shop information</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            ← Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center sticky top-6">
              {/* Avatar */}
              <div className="relative mx-auto w-32 h-32">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-teal-400 p-1 shadow-inner">
                  <div className="w-full h-full rounded-3xl bg-white overflow-hidden">
                    <img
                      src="/api/placeholder/128/128"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Upload badge */}
                <button className="absolute bottom-1 right-1 bg-white rounded-2xl shadow-lg p-2 hover:scale-110 transition-transform">
                  📸
                </button>
              </div>

              <h2 className="text-2xl font-bold mt-6 text-gray-900">The Mirage</h2>
              <p className="text-teal-600 font-medium">Pharmacy • Verified</p>

              {/* Shop Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium">OPENING BALANCE</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">KSh 0</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium">REMAINING BALANCE</p>
                  <p className="text-2xl font-semibold text-emerald-600 mt-1">KSh 0</p>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Registered on</span>
                  <span className="font-medium text-gray-700">06 Apr, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan expires</span>
                  <span className="font-medium text-amber-600">20 Apr, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl p-8">
            <div className="space-y-10">
              {/* Business Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Company / Business Name" />
                  <Input label="Email Address" type="email" />
                </div>
              </div>

              {/* Security Section */}
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Account Security
                </h3>
                <div className="space-y-6">
                  <Input label="Current Password" type="password" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="New Password" type="password" />
                    <Input label="Confirm New Password" type="password" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <Button className="flex-1 py-6 text-lg font-semibold bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700">
                  Save Changes
                </Button>
                <Button variant="outline" className="flex-1 py-6 text-lg font-semibold">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}