export default function Display({ expr, value, isError }) {
  const size = isError ? 'text-xl' : value.length > 10 ? 'text-3xl' : value.length > 7 ? 'text-4xl' : 'text-5xl'
  return (
    <div className="mb-5 rounded-2xl bg-lime-200 px-4 py-3 text-right text-stone-900 shadow-inner" aria-live="polite">
      <div className="h-6 truncate text-sm text-stone-600">{expr}</div>
      <div className={`h-14 flex items-center justify-end font-mono font-semibold ${size} ${isError ? 'text-red-700' : ''}`}>
        <span className="truncate">{value}</span>
      </div>
    </div>
  )
}
