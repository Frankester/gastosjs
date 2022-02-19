import { useState } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('')
  const [mount, setMount] = useState(0)
  const [cashFlow, setCashFlow] = useState([])
  const [money, setMoney] = useState('')

  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }
  const handleChangeMount = e => {
    setMount(e.target.value)
  }

  const addEntry = () => {
    if(mount !== '' && mount !== 0 && title !== ''){
      setCashFlow(prevExpenses => {
        return [...prevExpenses, { title: title, type:'ingreso', mount: mount}]
      })
      
      setMoney(prevMoney => String(Number(prevMoney) + mount))

      setTitle('')
      setMount(0)
    }
  }

  const addExpense = () => {
    if(mount != undefined && mount !== 0 && title !== ''){
      setCashFlow(prevExpenses => {
        return [...prevExpenses, { title: title, type:'gasto', mount: mount}]
      })

      setMoney(prevMoney => String(Number(prevMoney) - mount))

      setTitle('')
      setMount(0)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Gestor de gastos</h2>
        <p>Cartera Pricipal</p>
      </header>

      <div className='saldo'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        <p>{money ? String(Number(money)): '0'}$</p>
      </div>

      {
        cashFlow.length !== 0
        ? <h3>Historial</h3>
        : null
      }
      <div className='historial'>  
        {
          cashFlow.map((expense, index) => {
            return(
              <p className='historial-item' key={index}>
                {expense.title}
                <span className={expense.type}>{expense.mount}$</span>
              </p>
            )
          })
        }
      </div>

      <h3>Nueva entrada</h3>
      <form className='entrada'>

        <input  type='text' 
          placeholder='Introduce un concepto' 
          value={title} 
          onChange={handleChangeTitle}
        />

        <input  type='number' 
          placeholder='Introduce una cantidad' 
          min={1}
          value={mount}
          onChange={handleChangeMount}
        />

        <div className='buttons'>
          <button type='button' className='btn blue' onClick={addEntry}>Añadir ingreso</button>
          <button type='button' className='btn violet' onClick={addExpense}>Añadir gasto</button>
        </div>
      </form>
    </div>
  )
}

export default App
