import { prisma } from "../app/database.app";
import toResponseProduct, { CreateProductRequest, ProductResponse } from "../models/product.model";
import { ProductValidation } from "../validations/product.validation";
import { Validation } from "../validations/validation";
import { BrandService } from "./brand.service";

export class ProductService {
    static async create(payload: CreateProductRequest): Promise<ProductResponse> {
        const validation = Validation.validate(ProductValidation.CREATE, payload)

        // Validation id brand / merk
        await BrandService.getBrand(validation?.brandId);

        const result = await prisma.products.create({
            data: { ...validation }
        })

        return toResponseProduct(result)
    }
}