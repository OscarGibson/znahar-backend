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


config({ path: resolve(__dirname, `../.env${envPath()}`) })