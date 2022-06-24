import * as dotenv from 'dotenv'

dotenv.config()

const env = process.env

const app = {
	port: env.PORT || 3000,
}

export default app