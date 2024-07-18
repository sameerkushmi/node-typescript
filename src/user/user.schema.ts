import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
import { UserSchemaDto } from './user.dto'

const userSchema  = new Schema<UserSchemaDto>({
    fullname: {
        type: String,
        required : true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required : true,
        trim: true,
    }
}) 

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password.toString(),12)
    next()
})

const UserSchema = model<UserSchemaDto>("User", userSchema)
export default UserSchema 