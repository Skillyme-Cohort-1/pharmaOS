import Sidebar from './Sidebar'
import Header from './Header'

export default function PageWrapper({ title, action, children, alertCount }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar alertCount={alertCount} />

      {/* Main content area */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {title && <Header title={title} action={action} />}
          {children}
        </div>
      </main>
    </div>
  )
}
