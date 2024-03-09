import { PrismaClient, Brand } from "@prisma/client";
import toResponseBrand, { BrandResponse, CreateBrandRequest } from "../models/brand.model";
import { BrandValidation } from "../validations/brand.validation";
import { Validation } from "../validations/validation";
import { prisma } from "../app/database.app";

export class BrandService {
    static async create(payload: CreateBrandRequest): Promise<BrandResponse> {
        const validation = Validation.validate(BrandValidation.CREATE, payload);

        const result = await prisma.brand.create({
            data: { ...validation }
        })

        return toResponseBrand(result)
    }

    static async getBrands(): Promise<Brand[]> {
        const result = await prisma.brand.findMany({
            include: { products: true }
        })

        return result
    }
}