export interface SignupDto {
    fullname : string
    email : string
    password : string
}

export interface UserSchemaDto extends Document {
    fullname : string
    email : string
    password : string
}