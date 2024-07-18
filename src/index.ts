import 'dotenv/config'
import '../lib/db.lib'
import cors from 'cors'
import bodyParser from 'body-parser'
import CryptoJS from 'crypto-js'
import cookieParser from 'cookie-parser'

import express, {Request,Response} from 'express'
const app = express()

app.listen(8080)

// Routes
import userRouter from './user/user.routes' 

// cors setup
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// request entery security setup
app.use((req,res,next)=>{
    const userAgent = req.headers['x-user-agent']

    if(!userAgent)
        return res.status(400).send('Invalid Request !')

    const {sigBytes} = CryptoJS.AES.decrypt(userAgent as string,process.env.USER_AGENT_SECRET as string)
    if(sigBytes < 0)
        return res.status(400).send('Invalid Request !')

    //verify user agent
    next()
})

//cooki parser setup
app.use(cookieParser())

//body parser setup
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/test', (req: Request,res: Response)=>{
    res.json({success : true})
})
app.use('/user', userRouter)