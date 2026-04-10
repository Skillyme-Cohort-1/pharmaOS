import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductCard({ name, price, stock, image, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex flex-col text-left bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-forty-primary hover:shadow-lg transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-0.5'}`}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-forty-primary">{formatCurrency(price)}</p>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            stock > 10
              ? 'bg-emerald-50 text-emerald-700'
              : stock > 0
              ? 'bg-amber-50 text-amber-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {stock > 0 ? `${stock} left` : 'Out of stock'}
          </span>
        </div>
      </div>
    </button>
  )
}
