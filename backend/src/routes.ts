import express from 'express';
import { ProductController } from './controllers/productController'
import { UserController } from './controllers/userController';

const router = express.Router()

const productController = new ProductController()
const userController = new UserController()

router.get('/tools', productController.listAllProducts)
router.get('/tools/:id', productController.listProduct)

router.get('/users', userController.listAllUsers)
router.get('/users/:id', userController.listUser)


router.post('/tools/create', express.urlencoded({ extended: true }), productController.create)
router.post('/users/create', express.urlencoded({ extended: true }), userController.create)

router.post('/tools/edit/:id', express.urlencoded({ extended: true }), productController.edit)
router.post('/users/edit/:id', express.urlencoded({ extended: true }), userController.edit)

router.delete('/users/:id', userController.delete)
router.delete('/tools/:id', productController.delete)


export { router }