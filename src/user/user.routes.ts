import { Router } from 'express'
import { login , signup , forgotpassword, logout  } from "./user.controller"
const router = Router() 

router.post('/login',login) 
router.post('/signup',signup) 
router.post('/forgot-password',forgotpassword) 
router.post('/logout',logout) 

export default router