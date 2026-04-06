export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={
        "bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 " +
        className
      }
    >
      {children}
    </button>
  );
}