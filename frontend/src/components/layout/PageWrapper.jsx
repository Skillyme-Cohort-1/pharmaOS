import Sidebar from './Sidebar'
import Header from './Header'

export default function PageWrapper({ title, action, children, alertCount }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar alertCount={alertCount} />
      
      <main className="ml-64">
        <div className="px-8 py-6">
          {title && <Header title={title} action={action} />}
          {children}
        </div>
      </main>
    </div>
  )
}
