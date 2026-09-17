import { useState } from 'react'
import './App.css'

type Activity = { id: number; tone: 'in' | 'out' | 'save' | 'back'; value: number }
const format = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

function App() {
  const [balance, setBalance] = useState(48240.58)
  const [reserve, setReserve] = useState(7140)
  const [activity, setActivity] = useState<Activity[]>([
    { id: 1, tone: 'in', value: 2500 }, { id: 2, tone: 'out', value: -320 }, { id: 3, tone: 'save', value: 500 },
  ])
  const [history, setHistory] = useState(true)
  const [flash, setFlash] = useState(false)
  const record = (tone: Activity['tone'], value: number) => { setActivity(items => [{ id: Date.now(), tone, value }, ...items].slice(0, 4)); setFlash(true) }
  const receive = () => { setBalance(v => v + 120); record('in', 120) }
  const pay = () => { if (balance >= 75) { setBalance(v => v - 75); record('out', -75) } }
  const save = () => { if (balance >= 50) { setBalance(v => v - 50); setReserve(v => v + 50); record('save', 50) } }
  const take = () => { if (reserve >= 50) { setReserve(v => v - 50); setBalance(v => v + 50); record('back', 50) } }
  const reset = () => { setBalance(48240.58); setReserve(7140); setActivity([]); setFlash(true) }

  return <main className="app">
    <aside className="rail" aria-label="Navegação"><div className="logo"><span /><span /><span /></div><div className="rail-lines"><i /><i /><i /><i /></div><button type="button" className="rail-reset" aria-label="Restaurar valores" onClick={reset}>◒</button></aside>
    <section className="dashboard">
      <header><div className="date-block"><i /><i /><i /></div><div className="header-orbs"><span /><span /><span /></div></header>
      <section className="overview">
        <article className="balance-card"><div className="card-glow" /><div className="main-number">{format(balance)}</div><div className="number-line"><i /><i /><i /><i /></div><div className="card-bottom"><span>•• 8842</span><b>◌</b></div></article>
        <article className="reserve-card"><div className="reserve-mark"><span /><span /></div><strong>{format(reserve)}</strong><div className="reserve-bars"><i /><i /><i /></div></article>
        <article className="mini-chart" aria-hidden="true"><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="chart-dot" /></article>
      </section>
      <section className="control-row" aria-label="Operações bancárias">
        <button className="control rhombus" type="button" aria-label="Receber cento e vinte reais" onClick={receive}><span><i /></span></button>
        <button className="control prism" type="button" aria-label="Pagar setenta e cinco reais" onClick={pay}><span><i /><i /></span></button>
        <button className="control hex" type="button" aria-label="Guardar cinquenta reais na reserva" onClick={save}><span><i /></span></button>
        <button className="control orbit" type="button" aria-label="Resgatar cinquenta reais da reserva" onClick={take}><span><i /><i /></span></button>
        <button className="control lens" type="button" aria-label="Mostrar ou ocultar histórico" onClick={() => setHistory(v => !v)}><span><i /></span></button>
      </section>
      <section className={history ? 'activity visible' : 'activity'} aria-label="Movimentos recentes">
        <div className="activity-head"><i /><i /><i /></div>
        {activity.map((item, index) => <div className="movement" key={item.id}><span className={item.tone}><i /></span><div className="movement-lines"><i /><i /></div><b className={item.value >= 0 ? 'positive' : 'negative'}>{item.value >= 0 ? '+' : '−'}{format(Math.abs(item.value))}</b><em>{String(9 + index).padStart(2, '0')}:{index ? '20' : '40'}</em></div>)}
      </section>
      <div className={flash ? 'flash visible' : 'flash'} onAnimationEnd={() => setFlash(false)}>✦</div>
    </section>
  </main>
}
export default App
