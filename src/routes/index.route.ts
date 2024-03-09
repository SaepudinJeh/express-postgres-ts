import express from "express"
import { version_api } from "../helpers/version.api.helper"
import { BrandController } from "../controllers/brand.controller"

export const router = express.Router()
router.post(`/${version_api}/brand`, BrandController.create);
router.put(`/${version_api}/brand/:id`, BrandController.update);
router.get(`/${version_api}/brands`, BrandController.getBrands);
router.delete(`/${version_api}/brand/:id`, BrandController.delete);