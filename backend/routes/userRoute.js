import express from "express"
import { googleSignin, registerController, signinController } from "../controllers/userController.js"
const router = express.Router()

router.route('/signup').post(registerController)
router.route('/signin').post(signinController)
router.route('/googleSignIn').post(googleSignin)

export default router