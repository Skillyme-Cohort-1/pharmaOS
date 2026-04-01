export default function Header({ title, action }) {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      {action && <div>{action}</div>}
    </header>
  )
}
