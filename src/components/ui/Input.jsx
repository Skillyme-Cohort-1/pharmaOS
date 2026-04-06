export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium block">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-green-300"
      />
    </div>
  );
}