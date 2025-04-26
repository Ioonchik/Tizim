import { useEffect, useState } from 'react'
import './App.css'

type Item = {
  name: string,
  bought: boolean
}

function App() {
  const [items, setItems] = useState<Item[]>([])
  const [input, setInput] = useState("")

  //Load list from local storage at the start
  useEffect(() => {
    const storedItems = localStorage.getItem("shoppingList")
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  // Save the list after each edit
  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items))
  }, [items])


  const addItem = () => {
    if (input.trim() === "") return
    setItems([...items, { name: input, bought: false }])
    setInput("")
  }

  const toggleBought = (index: number) => {
    const newItems = [...items]
    newItems[index].bought = !newItems[index].bought
    setItems(newItems)
  }

  const deleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i != index)
    setItems(newItems)
  }

  return (
    <div className="max-w-md mx-auto mt-0 p-4 bg-white rounded shadow">
      <h1 className='text-2xl font-bold mb-4 text-center text-black'>Сатып алатын тауарлар тізімі</h1>

      <div className='flex gap-2 mb-4'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addItem()
            }
          }}
          placeholder='Тауардың атауы'
          className='flex-1 border rounded px-2 py-1 text-black'
        />
        <button
          onClick={addItem}
          className='bg-blue-500'
        >
          Қосу
        </button>
      </div>

      <ul className='space-y-2'>
        {items.map((item, i) => (
          <li
            key={i}
            className={`flex justify-between items-center border p-2 rounded text-black 
                ${item.bought ? 'bg-green-100 text-black' : ''
              }`}
          >
            <span className={item.bought ? "line-through" : ""}>
              {item.name}
            </span>

            <div className='flex gap-2'>
              <button
                onClick={() => toggleBought(i)}
                className='text-sm text-white px-2 py-1 rounded'
              >
                {item.bought ? "Болдырмау" : "Сатып алынды"}
              </button>
              <button
                onClick={() => deleteItem(i)}
                className='text-sm text-white px-2 py-1 rounded'
              >
                Өшіру
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div >
  )
}

export default App
