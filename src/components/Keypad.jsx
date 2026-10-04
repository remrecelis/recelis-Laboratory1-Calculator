const base = 'key h-16 rounded-2xl text-2xl font-medium select-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 sm:h-[4.5rem]'
const num = `${base} bg-stone-100 text-stone-900 hover:bg-white`
const util = `${base} bg-stone-500 text-white hover:bg-stone-400`
const opCls = (active) => `${base} ${active ? 'bg-white text-orange-600' : 'bg-orange-500 text-white hover:bg-orange-400'}`

export default function Keypad({ actions, activeOp }) {
  const { digit, dot, operator, equals, clear, backspace, negate } = actions
  const D = (n) => <button key={n} className={num} onClick={() => digit(n)}>{n}</button>
  const O = (o) => (
    <button key={o} className={opCls(activeOp === o)} onClick={() => operator(o)} aria-label={o}>{o}</button>
  )
  return (
    <div className="grid grid-cols-4 gap-3">
      <button className={util} onClick={clear} aria-label="Clear">C</button>
      <button className={util} onClick={negate} aria-label="Change sign">±</button>
      <button className={util} onClick={backspace} aria-label="Delete last digit">⌫</button>
      {O('÷')}
      {['7', '8', '9'].map(D)}{O('×')}
      {['4', '5', '6'].map(D)}{O('−')}
      {['1', '2', '3'].map(D)}{O('+')}
      <button className={`${num} col-span-2`} onClick={() => digit('0')}>0</button>
      <button className={num} onClick={dot} aria-label="Decimal point">.</button>
      <button className={`${base} bg-lime-300 text-stone-900 hover:bg-lime-200`} onClick={equals} aria-label="Equals">=</button>
    </div>
  )
}
