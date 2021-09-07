import { getRepository } from "typeorm"
import { User } from "../models/User"

interface IUser {
  nameClientContact: string;
  emailContact: string;
  telephoneContact: string;
  nameFantasyContact: string;
  email: string;
  telephoneCommercial: string;
  cnpj: string;
  cep: number;
  address: string;
  district: string;
  city: string;
  state: string;
  companySize: string;
  quantityEmployees: number;
}

class UserService {
  async create({
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
  }: IUser) {
    
    const usersRepository = getRepository(User)

    const userAlreadyExists = await usersRepository.findOne({ cnpj })
  
    if(userAlreadyExists) {
      throw new Error("User Already Exists")
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

    return user
    
  }

  async delete(id: string) {
    if(!id) {
      throw new Error("Error deleted")
    }

    const usersRepository = getRepository(User)

    await usersRepository.delete(id)
  }

  async edit(id: string, {
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
    quantityEmployees}: IUser) {

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

    const usersRepository = getRepository(User)

    await usersRepository.update(id, newUser)
  }
  
  async listUser(id: string) {

      const usersRepository = getRepository(User)

      const user = await usersRepository.findOne({id})

      return user
  }

  async listAllUsers() {
    const usersRepository = getRepository(User)

    const allUsers = await usersRepository.find()
    
    return allUsers
  }
}

export {UserService}

  // async delete(request: Request, response: Response) {
  //   const {id} = request.params

  //   try {
  //     const usersRepository = getRepository(User)

  //     await usersRepository.delete(id)
  //     response.json('user deleted')
  //   } catch (error) {
  //     response.send("Error delete")
  //   }
  // }

  // async edit(request: Request, response: Response) {
  //   const {id} = request.params

  //   const { 
  //     nameClientContact,
  //     emailContact,
  //     telephoneContact,
  //     nameFantasyContact,
  //     email,
  //     telephoneCommercial,
  //     cnpj,
  //     cep,
  //     address,
  //     district,
  //     city,
  //     state,
  //     companySize,
  //     quantityEmployees
  //    } = request.body

  //   const newUser = {
  //     nameClientContact,
  //     emailContact,
  //     telephoneContact,
  //     nameFantasyContact,
  //     email,
  //     telephoneCommercial,
  //     cnpj,
  //     cep,
  //     address,
  //     district,
  //     city,
  //     state,
  //     companySize,
  //     quantityEmployees
  //   }

  //   try {
  //     const usersRepository = getRepository(User)

  //     const userAlreadyExists = await usersRepository.findOne(cnpj)

  //     if(userAlreadyExists) {
  //       return response.json({ error: "User Already Exists"})
  //     }

  //     await usersRepository.update(id, newUser)

  //     response.redirect('http://localhost:3000/')
  //   } catch (error) {
  //     response.json({error})
  //   }
  // }

  // async listUser(request: Request, response: Response) {
  //   const {id} = request.params

  //   try {
  //     const usersRepository = getRepository(User)

  //     const user = await usersRepository.findOne({id})

  //     response.json(user)
  //   } catch (error) {
  //     return response.status(400).json({ error })
  //   }
  // }

  // async listAllUsers(request: Request, response: Response) {
  //   try {
  //     const usersRepository = getRepository(User)

  //     const allUsers = await usersRepository.find()
      
  //     response.json(allUsers)

  //   } catch (error) {
  //     return response.status(400).json({ error })
  //   }
    
  // }