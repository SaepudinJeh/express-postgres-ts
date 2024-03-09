import { NextFunction, Request, Response } from "express";
import { CreateProductRequest } from "../models/product.model";
import { ProductService } from "../services/product.service";

export class ProductController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: CreateProductRequest = req.body as CreateProductRequest;

            const response = await ProductService.create(payload);

            return res.status(201).json({
                statusCode: 201,
                message: "Success Created Product!",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}