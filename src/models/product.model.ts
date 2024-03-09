import { Products } from "@prisma/client"

export type CreateProductRequest = {
    name: string,
    desc: string,
    price: number,
    stock: number,
}


export type UpdateProductRequest = {
    name?: string,
    desc?: string,
    price?: number,
    stock?: number
}

export type GetProductRequest = {
    id: number
}

export type RemoveProductRequest = {
    id: number,
    brandId: number
}

export default function toResponseProduct(product: Products): CreateProductRequest{
    return {
        name: product?.name,
        desc: product?.desc,
        price: product?.price,
        stock: product?.stock
    }
}
