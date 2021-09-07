import { Request, Response } from 'express'
import { UserService } from '../services/userService'

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { 
        nameClientContact,
        emailContact,
        telephoneContact,
        nameFantasyContact,
        email,
        telephoneCommercial,
        cnpj,
        cep,
        address,
        district,
        city,
        state,
        companySize,
        quantityEmployees
       } = request.body

      const userService = new UserService()

      await userService.create({
        nameClientContact,
        emailContact,
        telephoneContact,
        nameFantasyContact,
        email,
        telephoneCommercial,
        cnpj,
        cep,
        address,
        district,
        city,
        state,
        companySize,
        quantityEmployees
      })
      
      response.redirect('http://localhost:3000/')

    } catch (error) {
      response.json("User already exists")
    }
    
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params

    try {
      const userService = new UserService()

      await userService.delete(id)
      response.json('User deleted')
    } catch (error) {
      response.send("Error")
    }
  }

  async edit(request: Request, response: Response) {
    const {id} = request.params

    const { 
      nameClientContact,
      emailContact,
      telephoneContact,
      nameFantasyContact,
      email,
      telephoneCommercial,
      cnpj,
      cep,
      address,
      district,
      city,
      state,
      companySize,
      quantityEmployees
     } = request.body

    try {
      const userService = new UserService()

      await userService.edit(id, {
        nameClientContact,
        emailContact,
        telephoneContact,
        nameFantasyContact,
        email,
        telephoneCommercial,
        cnpj,
        cep,
        address,
        district,
        city,
        state,
        companySize,
        quantityEmployees})

      response.redirect('http://localhost:3000/')
    } catch (error) {
      response.json({error})
    }
  }

  async listUser(request: Request, response: Response) {
    const {id} = request.params

    try {
      const userService = new UserService()

      const user = await userService.listUser(id)

      response.json(user)
    } catch (error) {
      return response.status(400).json({ error: "Error" })
    }
  }

  async listAllUsers(request: Request, response: Response) {
    try {
      const userService = new UserService()
      
      const allUsers = await userService.listAllUsers()

      response.json(allUsers)

    } catch (error) {
      return response.status(400).json({ error: "Error" })
    }
    
  }
}

export { UserController }