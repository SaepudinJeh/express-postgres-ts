import express from "express"
import { version_api } from "../helpers/version.api.helper"
import { BrandController } from "../controllers/brand.controller"

export const router = express.Router()
router.post(`/${version_api}/brand`, BrandController.create);
router.get(`/${version_api}/brands`, BrandController.getBrands);