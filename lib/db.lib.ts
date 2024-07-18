import mongoose from 'mongoose'
mongoose.connect(process.env.DB_URL as string)
.then((conn)=>console.log('database connected'))
.catch((err)=>console.log(err.message))