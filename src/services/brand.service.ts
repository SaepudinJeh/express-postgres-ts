import { PrismaClient, Brand } from "@prisma/client";
import toResponseBrand, { BrandResponse, CreateBrandRequest, UpdateBrandRequest } from "../models/brand.model";
import { BrandValidation } from "../validations/brand.validation";
import { Validation } from "../validations/validation";
import { prisma } from "../app/database.app";
import { ResponseError } from "../helpers/error_response.helper";

export class BrandService {
    static async create(payload: CreateBrandRequest): Promise<BrandResponse> {
        const validation = Validation.validate(BrandValidation.CREATE, payload);

        const result = await prisma.brand.create({
            data: { ...validation }
        })

        return toResponseBrand(result)
    }

    static async update(id: number, payload: UpdateBrandRequest): Promise<BrandResponse> {
        const validation = Validation.validate(BrandValidation.UPDATE, payload);

        const brandExist = await prisma.brand.findFirst({ where: { id } })

        if(!brandExist) throw new ResponseError(400, "Brand Not Exist!");
        
        
        const result = await prisma.brand.update({
            where: { id },
            data: { ...validation }
        })

        return toResponseBrand(result)
    }

    static async delete(id: number): Promise<string> {
        const brandExist = await prisma.brand.findFirst({ where: { id } })

        if(!brandExist) throw new ResponseError(400, "Brand Not Exist!");

        await prisma.brand.update({
            where: { id },
            data: { deletedAt: new Date() }
        })

        return "Success Deleted Brand!"
    }

    static async getBrands(): Promise<Brand[]> {
        const result = await prisma.brand.findMany({
            where: {
                deletedAt: { equals: null }
            },
            include: { products: true },
        })

        return result
    }
}