export default function Guide() {
  return (
    <section aria-label="User guide" className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-md lg:max-w-md">
      <h2 className="text-xl font-semibold">How to use the calculator</h2>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-stone-700">
        <li>Press number buttons to enter the first number.</li>
        <li>Choose an operator (+, −, ×, ÷).</li>
        <li>Enter the second number.</li>
        <li>Press = to see the result.</li>
        <li>Press C to clear everything, or ⌫ to delete the last digit.</li>
      </ol>

      <h2 className="mt-6 text-xl font-semibold">Supported operations</h2>
      <ul className="mt-3 space-y-1.5 text-stone-700">
        <li><b>+</b> Addition</li>
        <li><b>−</b> Subtraction</li>
        <li><b>×</b> Multiplication</li>
        <li><b>÷</b> Division (dividing by zero shows an error)</li>
        <li><b>±</b> Change sign &nbsp; <b>.</b> Decimals</li>
      </ul>

      <h2 className="mt-6 text-xl font-semibold">Keyboard shortcuts</h2>
      <p className="mt-3 text-stone-700">
        Type 0–9 and . for numbers, + − * / for operators, Enter or = to calculate,
        Backspace to delete, and Esc or C to clear.
      </p>
    </section>
  )
}
