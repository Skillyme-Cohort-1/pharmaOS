import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/ui/Button'
import { Pill } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await login(email, password)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gray-900 overflow-hidden relative">
        {/* Abstract pill shapes background */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative z-10 flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center pl-0.5">
            <Pill size={18} className="text-white transform -rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-teal-400">Pharma</span>OS
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            The operational backbone of the modern pharmacy.
          </h1>
          <p className="text-gray-400 text-lg">
            Streamline your inventory, manage orders seamlessly, and rely on real-time data to serve your patients better.
          </p>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Tech Vanguard. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <div className="w-8 h-8 rounded bg-teal-500 flex items-center justify-center pl-0.5">
              <Pill size={18} className="text-white transform -rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              <span className="text-teal-600">Pharma</span>OS
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Please sign in to your account to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-150"
                placeholder="admin@pharmaos.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow duration-150"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full py-3 text-base flex justify-center" 
              size="lg"
              loading={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Development hint */}
          {import.meta.env.DEV && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800">
              <div className="flex items-center justify-between mb-2">
                <strong>Dev Helper:</strong>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@pharmaos.com')
                    setPassword('pharma123')
                  }}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                >
                  Auto-fill
                </button>
              </div>
              <div className="space-y-1">
                <div>Email: <code>admin@pharmaos.com</code></div>
                <div>Pass: <code>pharma123</code></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
