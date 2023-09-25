import express from "express"
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./logic"
import { isIdUnique, isNameUnique } from "./middlewares"

const app = express()
app.use(express.json())

app.post("/products", isNameUnique, createProduct)
app.get("/products", getProducts)
app.get("/products/:id", isIdUnique, getOneProduct)
app.patch("/products/:id", isIdUnique, isNameUnique, updateProduct)
app.delete("/products/:id", isIdUnique, deleteProduct)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})