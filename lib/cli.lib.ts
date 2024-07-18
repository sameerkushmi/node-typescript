import fs from 'fs'
const args = process.argv.slice(2)
if(args.length > 0){

    const lowerCaseArray = args.map((item)=> item.toLowerCase())
    const service = lowerCaseArray.join("-")
    const capitalizeString = lowerCaseArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')

    console.log(capitalizeString)
    const routesContent = [
        "import express from 'express' ",
        `import {fetch${capitalizeString}, create${capitalizeString}, update${capitalizeString} ,delete${capitalizeString} } from './${service}.controller'`,
        "const router = express.Router() \n",
        `router.get('/',fetch${capitalizeString})`,
        `router.post('/',create${capitalizeString})`,
        `router.put('/',update${capitalizeString})`,
        `router.delete('/',delete${capitalizeString})\n`,
        "export default router" ,
    ]

    const controllerContent = [
        `import { Request, Response } from 'express'`,
        `import ${capitalizeString}Schema from './${service}.schema'\n`,
        `export const fetch${capitalizeString} = (req: Request,res: Response) => {\n\t res.send('sucess')\n}\n`,
        `export const create${capitalizeString} = (req: Request,res: Response) => {\n\t res.send('sucess')\n}\n`,
        `export const update${capitalizeString} = (req: Request,res: Response) => {\n\t res.send('sucess')\n}\n`,
        `export const delete${capitalizeString} = (req: Request,res: Response) => {\n\t res.send('sucess')\n}\n`,
    ]

    const schemaContent = [
        `import {Schema,model} from 'mongoose'\n`,
        `const schema = new Schema({\n})\n`,
        `const ${capitalizeString}Schema = model("${capitalizeString}",schema)`,
        `export default ${capitalizeString}Schema `
    ]
    
    try{
        fs.mkdirSync(`./src/${service}`)
        fs.writeFileSync(`./src/${service}/${service}.routes.ts`,routesContent.join('\n'))
        fs.writeFileSync(`./src/${service}/${service}.controller.ts`,controllerContent.join('\n'))
        fs.writeFileSync(`./src/${service}/${service}.schema.ts`,schemaContent.join('\n'))
        fs.writeFileSync(`./src/${service}/${service}.dto.ts`,'')
        const serverFile = fs.readFileSync('./src/index.ts','utf8')
        const fileArray = serverFile.split('\n')
        const statements: any[] = []
    
        for(let data of fileArray)
        {
            statements.push(data)
            if(data === '// Routes\r')
                statements.push(`import ${service.split('-').join('')}Router from './${service}/${service}.routes' `)
        }
        statements.push(`app.use('/${service}', ${service.split('-').join('')}Router)`)
    
        const original = statements.join('\n')
        fs.writeFileSync('./src/index.ts',original, 'utf8')
        console.log('file created !')
    }
    catch(err: any)
    {
        console.log(`${service} is already exist !`)
    }
}
else
{
    console.log('name is required !')
}