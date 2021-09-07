import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Product } from "../models/Product";
import { ProductService } from "../services/productService";

class ProductController {
  async create(request: Request, response: Response) {
    const { 
      name, 
      priceSmallSize, 
      priceMidSize, 
      priceLargeSize
    } = request.body;
    
    const productService = new ProductService()

    productService.create({name, priceSmallSize, priceMidSize, priceLargeSize})

    response.redirect('http://localhost:3000/tools');
  }

  async edit(request: Request, response: Response) {
    const {id} = request.params

    const { 
      name,
      priceSmallSize,
      priceMidSize,
      priceLargeSize
    } = request.body

    try {
      const productService = new ProductService()

      await productService.edit(id, { 
        name,
        priceSmallSize,
        priceMidSize,
        priceLargeSize
      })

      response.redirect('http://localhost:3000/tools')
    } catch (error) {
      response.json({error: "Error update"})
    }
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params

    try {
      const productService = new ProductService()

      await productService.delete(id)

      response.json('Product deleted')
    } catch (error) {
      response.send("Error delete")
    }
  }

  async listProduct(request: Request, response: Response) {
    const {id} = request.params

    try {
      const productService = new ProductService()

      const product = await productService.listProduct(id)

      response.json(product)
    } catch (error) {
      return response.status(400).json({ error: "Error" })
    }
  }

  async listAllProducts(request: Request, response: Response){
    const productService = new ProductService()

    const allProducts = await productService.listAllProducts()

    response.json(allProducts)
  }
}

export { ProductController }