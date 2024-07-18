import express from 'express' 
import {fetchUserPayments, createUserPayments, updateUserPayments ,deleteUserPayments } from './user-payments.controller'
const router = express.Router() 

router.get('/',fetchUserPayments)
router.post('/',createUserPayments)
router.put('/',updateUserPayments)
router.delete('/',deleteUserPayments)

export default router