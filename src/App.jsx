import { useState, useEffect, useCallback } from 'react'
import Display from './components/Display.jsx'
import Keypad from './components/Keypad.jsx'
import Guide from './components/Guide.jsx'

const MAX_DIGITS = 12
const initial = { current: '0', prev: null, op: null, waiting: false, done: false, error: null, expr: '' }

function compute(a, b, op) {
  const x = parseFloat(a), y = parseFloat(b)
  if (op === '+') return x + y
  if (op === '−') return x - y
  if (op === '×') return x * y
  if (op === '÷') return y === 0 ? null : x / y
}

const fmt = (n) => String(parseFloat(n.toPrecision(12)))

export default function App() {
  const [s, setS] = useState(initial)

  const digit = useCallback((d) => setS((p) => {
    if (p.error) p = initial
    if (p.waiting || p.done || p.current === '0') return { ...p, current: d, waiting: false, done: false, expr: p.done ? '' : p.expr }
    if (p.current.replace(/[-.]/g, '').length >= MAX_DIGITS) return p
    return { ...p, current: p.current + d }
  }), [])

  const dot = useCallback(() => setS((p) => {
    if (p.error) p = initial
    if (p.waiting || p.done) return { ...p, current: '0.', waiting: false, done: false, expr: p.done ? '' : p.expr }
    if (p.current.includes('.')) return p
    return { ...p, current: p.current + '.' }
  }), [])

  const operator = useCallback((o) => setS((p) => {
    if (p.error) return p
    if (p.op && p.waiting) return { ...p, op: o, expr: `${p.prev} ${o}` }
    if (p.op && !p.done) {
      const r = compute(p.prev, p.current, p.op)
      if (r === null) return { ...initial, error: 'Cannot divide by zero', expr: `${p.prev} ÷ ${p.current}` }
      const v = fmt(r)
      return { ...p, current: v, prev: v, op: o, waiting: true, done: false, expr: `${v} ${o}` }
    }
    return { ...p, prev: p.current, op: o, waiting: true, done: false, expr: `${p.current} ${o}` }
  }), [])

  const equals = useCallback(() => setS((p) => {
    if (p.error || !p.op || p.waiting) return p
    const r = compute(p.prev, p.current, p.op)
    const expr = `${p.prev} ${p.op} ${p.current} =`
    if (r === null) return { ...initial, error: 'Cannot divide by zero', expr }
    return { ...initial, current: fmt(r), done: true, expr }
  }), [])

  const clear = useCallback(() => setS(initial), [])

  const backspace = useCallback(() => setS((p) => {
    if (p.error) return initial
    if (p.waiting || p.done) return p
    const next = p.current.length > 1 && p.current !== '-0' ? p.current.slice(0, -1) : '0'
    return { ...p, current: next === '-' ? '0' : next }
  }), [])

  const negate = useCallback(() => setS((p) => {
    if (p.error || p.current === '0') return p
    return { ...p, current: p.current.startsWith('-') ? p.current.slice(1) : '-' + p.current }
  }), [])

  useEffect(() => {
    const map = { '*': '×', '/': '÷', '-': '−', '+': '+' }
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key
      if (/^[0-9]$/.test(k)) digit(k)
      else if (k === '.') dot()
      else if (map[k]) { e.preventDefault(); operator(map[k]) }
      else if (k === 'Enter' || k === '=') { e.preventDefault(); equals() }
      else if (k === 'Backspace') backspace()
      else if (k === 'Escape' || k.toLowerCase() === 'c') clear()
      else return
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [digit, dot, operator, equals, backspace, clear])

  const actions = { digit, dot, operator, equals, clear, backspace, negate }

  return (
    <main className="min-h-screen bg-stone-200 text-stone-900 px-4 py-8 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
      <section aria-label="Calculator" className="w-full max-w-sm rounded-3xl bg-stone-800 p-5 shadow-xl">
        <Display expr={s.expr} value={s.error ?? s.current} isError={!!s.error} />
        <Keypad actions={actions} activeOp={s.waiting ? s.op : null} />
      </section>
      <Guide />
    </main>
  )
}
