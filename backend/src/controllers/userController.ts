import { Request, response, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

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
  
      const usersRepository = getRepository(User)
  
      const userAlreadyExists = await usersRepository.findOne({ cnpj })
    
      if(userAlreadyExists) {
        return response.status(400).json({ error: 'User already exists' })
      }
  
      const user = usersRepository.create({
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
  
      await usersRepository.save(user)
  
      response.redirect('http://localhost:3000/')

    } catch (error) {
      response.json({error})
    }
    
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params

    try {
      const usersRepository = getRepository(User)

      await usersRepository.delete(id)
      response.json('user deleted')
    } catch (error) {
      response.send("Error delete")
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

    const newUser = {
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
    }

    console.log(newUser)

    try {
      const usersRepository = getRepository(User)

      const userAlreadyExists = await usersRepository.findOne(cnpj)

      if(userAlreadyExists) {
        return response.json({ error: "User Already Exists"})
      }

      await usersRepository.update(id, newUser)

      response.redirect('http://localhost:3000/')
    } catch (error) {
      response.json({error})
    }
  }

  async listUser(request: Request, response: Response) {
    const {id} = request.params

    try {
      const usersRepository = getRepository(User)

      const user = await usersRepository.findOne({id})

      response.json(user)
    } catch (error) {
      return response.status(400).json({ error })
    }
  }

  async listAllUsers(request: Request, response: Response) {
    try {
      const usersRepository = getRepository(User)

      const allUsers = await usersRepository.find()
      
      response.json(allUsers)

    } catch (error) {
      return response.status(400).json({ error })
    }
    
  }
}

export { UserController }