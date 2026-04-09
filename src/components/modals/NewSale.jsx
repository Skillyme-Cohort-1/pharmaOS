import React, { useRef, useState } from 'react';

// Mock product data
const AVAILABLE_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99.99 },
  { id: 2, name: 'Mechanical Keyboard', price: 129.50 },
  { id: 3, name: 'Ergonomic Mouse', price: 45.00 },
  { id: 4, name: 'USB-C Docking Station', price: 75.25 },
  { id: 5, name: 'Desk Mat', price: 20.00 },
  { id: 6, name: 'Webcam 1080p', price: 60.00 },
];

export default function NewSale() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const invoiceSequenceRef = useRef(100000);
  
  // State to hold the generated invoice data for the receipt modal
  const [completedInvoice, setCompletedInvoice] = useState(null);

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle final checkout and generate Invoice
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Capture Date & Time
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    invoiceSequenceRef.current += 1;
    const invoiceNumber = `INV-${invoiceSequenceRef.current}`;

    // Build the complete invoice payload
    const invoicePayload = {
      invoiceId: invoiceNumber,
      date: formattedDate,
      time: formattedTime,
      customer: customerName.trim() || 'Guest Customer',
      paymentMethod: paymentMethod,
      items: [...cart],
      totalAmount: cartTotal,
    };

    // Show the invoice modal
    setCompletedInvoice(invoicePayload);

    // Reset the cart for the next sale
    setCart([]);
    setCustomerName('');
    setPaymentMethod('Credit Card');
  };

  const closeInvoice = () => {
    setCompletedInvoice(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans relative rounded-xl overflow-hidden shadow-sm border border-gray-200 mt-4">
      
      {/* LEFT SECTION: Product Catalog */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Select Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AVAILABLE_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SECTION: Cart & Checkout */}
      <div className="w-full md:w-96 lg:w-[400px] bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col sticky top-0 h-[80vh] z-10">
        
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
              <span className="text-4xl">🛒</span>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                  <div className="flex-1 pr-2">
                    <h4 className="font-medium text-sm text-gray-800 leading-tight">{item.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="ml-1 text-red-500 hover:text-red-700 text-sm font-medium p-1"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Checkout Footer */}
        <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200 flex flex-col gap-4">
          
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              id="customer"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Leave blank for Guest"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="M-Pesa">M-Pesa</option>
            </select>
          </div>

          <div className="mt-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-colors
                ${cart.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-teal-600 hover:bg-teal-700 shadow-sm'
                }`}
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>

      {/* INVOICE MODAL */}
      {completedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="bg-slate-900 text-white p-6 text-center">
              <h2 className="text-2xl font-bold tracking-wider">INVOICE</h2>
              <p className="text-slate-400 mt-1 text-sm">{completedInvoice.invoiceId}</p>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="block text-gray-500 mb-1">Date & Time</span>
                  <span className="font-medium text-gray-800 block">{completedInvoice.date}</span>
                  <span className="font-medium text-gray-800">{completedInvoice.time}</span>
                </div>
                <div className="text-right">
                  <span className="block text-gray-500 mb-1">Billed To</span>
                  <span className="font-medium text-gray-800">{completedInvoice.customer}</span>
                </div>
                <div>
                  <span className="block text-gray-500 mb-1">Payment Method</span>
                  <span className="font-medium text-gray-800">{completedInvoice.paymentMethod}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <span className="block text-gray-500 mb-3 text-sm font-medium">Items</span>
                <ul className="space-y-3">
                  {completedInvoice.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-800">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-base font-bold text-gray-800">Total Amount</span>
                <span className="text-xl font-bold text-teal-600">
                  ${completedInvoice.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={closeInvoice}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Close & Start New Sale
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
}
