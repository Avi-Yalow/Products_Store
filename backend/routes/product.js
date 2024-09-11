import express from 'express'
import mongoose from 'mongoose'
import Product from '../models/product.js'
import { createProduct, deleteProduct, getProducts, updatedProduct } from '../controller/product.js'
const router = express.Router()
router.post("/", createProduct)
router.delete("/:id", deleteProduct)
router.put("/:id", updatedProduct)
router.get("/", getProducts)


export default router