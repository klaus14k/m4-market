import { Request, Response } from "express"
import { Product } from "./interfaces"
import { market } from "./database"

let productId = 1

export const createProduct = (req: Request, res: Response) => {
    const date = new Date().setFullYear(2024)
    const futureDate = new Date(date)

    const newProduct: Product = {
        id: productId,
        name: req.body.name,
        price: req.body.price,
        weight: req.body.weight,
        section: req.body.section,
        calories: req.body.calories,
        expirationDate: futureDate,
    }
    market.push(newProduct)
    productId++
    return res.status(201).json(newProduct)
}

export const getProducts = (req: Request, res: Response) => {
    let totalPrice = 0
    market.forEach(product => totalPrice += product.price)

    return res.status(200).json({ total: totalPrice, products: market })
}

export const getOneProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const product = market.find(product => product.id === id)
    return res.status(200).json(product)
}

export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = market.find(product => product.id === id)

    let updatedData: Partial<Omit<Product, "id" | "section" | "expirationDate">> = {}

    Object.entries(req.body).forEach(([key, value]) => {
        if (key === "name" || key === "price" || key === "weight" || key === "calories") {
            updatedData[key] = value as string
        }
    })

    const updatedProduct = { ...product, ...updatedData } as Product

    const index = market.findIndex(product => product.id === id)
    market.splice(index, 1, updatedProduct)

    return res.status(200).json(updatedProduct)
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const index = market.findIndex(product => product.id === id)
    market.splice(index, 1)

    return res.status(204).json(null)
}