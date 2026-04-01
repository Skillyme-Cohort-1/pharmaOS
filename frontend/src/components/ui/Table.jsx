import LoadingSpinner from './LoadingSpinner'
import EmptyState from './EmptyState'

export default function Table({ 
  columns = [], 
  data = [], 
  loading = false,
  emptyState,
  className = ''
}) {
  if (loading) {
    return (
      <div className="border rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="animate-pulse">
                {columns.map((_, idx) => (
                  <td key={idx} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (data.length === 0) {
    if (emptyState) {
      return emptyState
    }
    return (
      <EmptyState
        title="No data available"
        description="There are no records to display at this time."
      />
    )
  }

  return (
    <div className={`border rounded-xl overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIdx) => (
                <td 
                  key={colIdx} 
                  className={`px-4 py-3 text-sm ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                >
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
