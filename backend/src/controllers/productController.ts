import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Product } from "../models/Product";

class ProductController {
  async create(request: Request, response: Response) {
    const { 
      name, 
      priceSmallSize, 
      priceMidSize, 
      priceLargeSize
    } = request.body;
    
    const productsRepository = getRepository(Product)

    const productAlreadyExists = await productsRepository.findOne({
      name
    })

    if(productAlreadyExists) {
      return response.status(400).json({error: "Product already exists"})
    }

    const product = productsRepository.create({
      name,
      priceSmallSize,
      priceMidSize,
      priceLargeSize
    })

    await productsRepository.save(product)

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

    const newUser = {
      name,
      priceSmallSize,
      priceMidSize,
      priceLargeSize
    }

    try {
      const productsRepository = getRepository(Product)

      const ProductAlreadyExists = await productsRepository.findOne({name})
      
      if(ProductAlreadyExists) {
        return response.json({error: 'product already exists'})
      }

      await productsRepository.update(id, newUser)

      response.redirect('http://localhost:3000/tools')
    } catch (error) {
      response.json({error})
    }
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params

    try {
      const productsRepository = getRepository(Product)

      await productsRepository.delete(id)
      response.json('Product deleted')
    } catch (error) {
      response.send("Error delete")
    }
  }

  async listProduct(request: Request, response: Response) {
    const {id} = request.params

    try {
      const productsRepository = getRepository(Product)

      const product = await productsRepository.findOne({id})

      response.json(product)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async listAllProducts(request: Request, response: Response){
    const productsRepository = getRepository(Product)

    const allProducts = await productsRepository.find()

    response.json(allProducts)
  }
}

export { ProductController }