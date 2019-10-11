import { resolve } from "path"

import { config } from "dotenv"


const envPath = ():string => {
    switch (process.env.NODE_ENV) {
        case "development":
            return ".local"

        case "test":
            return ".test"

        case "production":
            return ""
    
        default:
            return ""
    }
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV, resolve(__dirname, `../.env${envPath()}`), __dirname)


config({ path: resolve(__dirname, `../.env${envPath()}`) })

console.log("env", process.env)