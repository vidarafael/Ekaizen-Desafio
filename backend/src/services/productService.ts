import { getRepository } from "typeorm"
import { Product } from "../models/Product"

interface IProduct {
  name: string;
  priceSmallSize: number;
  priceMidSize: number;
  priceLargeSize: number;
}

class ProductService {
  async create({name, priceSmallSize, priceMidSize, priceLargeSize}: IProduct) {
    
    const productsRepository = getRepository(Product)

    const productAlreadyExists = await productsRepository.findOne({
      name
    })

    if(productAlreadyExists) {
      throw new Error("Product already exists")
    }

    const product = productsRepository.create({
      name,
      priceSmallSize,
      priceMidSize,
      priceLargeSize
    })

    await productsRepository.save(product)
  }

  async edit(id: string, {
    name,
    priceSmallSize,
    priceMidSize,
    priceLargeSize 
  }: IProduct) {

    const newProduct = {
      name,
      priceSmallSize,
      priceMidSize,
      priceLargeSize
    }

    const productsRepository = getRepository(Product)

    await productsRepository.update(id, newProduct)
  }

  async delete(id: string) {

    if(!id) {
      throw new Error("Error deleted")
    }

    const productsRepository = getRepository(Product)

    await productsRepository.delete(id)
      
  }

  async listProduct(id: string) {

    const productsRepository = getRepository(Product)

    const product = await productsRepository.findOne({id})

    return product
  
  }

  async listAllProducts() {
    const productsRepository = getRepository(Product)

    const allProducts = await productsRepository.find()

    return allProducts
  }
}

export { ProductService }