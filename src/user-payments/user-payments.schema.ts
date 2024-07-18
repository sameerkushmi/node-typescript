import {Schema,model} from 'mongoose'

const schema = new Schema({
})

const UserPaymentsSchema = model("UserPayments",schema)
export default UserPaymentsSchema 