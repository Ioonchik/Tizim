const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let items = [
    { name: "Сүт", bought: false },
    { name: "Нан", bought: true },
]

// Get all products
app.get('/items', (req, res) => {
    res.json(items)
})

// Get all products
app.post('/items', (req, res) => {
    const { name } = req.body
    if (name) {
        items.push({ name, bought: false })
        res.status(201).json({ message: "Item added" })
    } else {
        res.status(400).json({ message: "Name is required" })
    }
})

// Switch the state of "bought"
app.patch('/items/:index', (req, res) => {
    const index = parseInt(req.params.index)
    if (items[index]) {
        items[index].bought = !items[index].bought
        res.json({ message: "Item updated" })
    } else {
        res.status(404).json({ message: "Item not found" })
    }
})

// Delete product
app.delete('/items/:index', (req, res) => {
    const index = parseInt(req.params.index)
    if (items[index]) {
        items.splice(index, 1)
        res.json({ message: "Item deleted" })
    } else {
        res.status(404).json({ message: "Item not found" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})