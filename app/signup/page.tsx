import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Creator Toolkit
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">Start buying or selling tools</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-600">
                  I want to sell tools on the marketplace
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
            >
              Create Account
            </button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-gray-900 font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

