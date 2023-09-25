import { NextFunction, Request, Response } from "express"
import { market } from "./database"

export const isNameUnique = (req: Request, res: Response, next: NextFunction) => {
    if (market.some(product => product.name === req.body.name)) {
        return res.status(409).json({ message: "Product already registered." })
    }
    next()
}

export const isIdUnique = (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    if (!market.some(product => product.id === id)) {
        return res.status(404).json({ message: "Product not found." })
    }
    next()
}