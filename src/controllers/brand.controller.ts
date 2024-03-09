import { NextFunction, Request, Response } from "express";
import { CreateBrandRequest } from "../models/brand.model";
import { BrandService } from "../services/brand.service";

export class BrandController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: CreateBrandRequest = req.body as CreateBrandRequest;

            const response = await BrandService.create(payload);

            return res.status(201).json({
                statusCode: 201,
                message: "Success Created Brand!",
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await BrandService.getBrands();

            return res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}