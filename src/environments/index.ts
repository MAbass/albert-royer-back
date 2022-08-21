import { ConfigEnvironment } from '@config-env'

// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// author
const AUTHOR: string =
	ConfigEnvironment.getEnvPath('AUTHOR') || 'Mamadou Abass DIALLO'
// application
const PRIMARY_COLOR: string =
	ConfigEnvironment.getEnvPath('PRIMARY_COLOR') || '#87e8de'
const DOMAIN: string = ConfigEnvironment.getEnvPath('DOMAIN') || 'localhost'
const PORT: number = +ConfigEnvironment.getEnvPath('PORT') || 8080
const END_POINT: string = ConfigEnvironment.getEnvPath('END_POINT') || 'api/v1'
const RATE_LIMIT_MAX: number =
	+ConfigEnvironment.getEnvPath('RATE_LIMIT_MAX') || 10000

// static
const STATIC: string = ConfigEnvironment.getEnvPath('STATIC') || 'static'

// mongodb
const MONGO_PORT: number = +ConfigEnvironment.getEnvPath('MONGO_PORT') || 27019
const MONGO_HOST: string =
	ConfigEnvironment.getEnvPath('MONGO_HOST') || 'localhost'
const MONGO_DB: string = ConfigEnvironment.getEnvPath('MONGO_DATABASE')
const MONGO_PASS: string = ConfigEnvironment.getEnvPath('MONGO_PASS')
const MONGO_USER: string = ConfigEnvironment.getEnvPath('MONGO_USER')

export const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
// export const MONGO_URL = `mongodb://${MONGO_HOST}`

// console.log('MONGO_PORT: ', MONGO_PORT)
// console.log('MONGO_USER: ', ConfigEnvironment.getEnvPath('MONGO_USER'))
// console.log('MONGO_DATABASE: ', MONGO_DB)
// console.log('MONGO_PASS: ', MONGO_PASS)
// console.log('MONGO_DB: ', MONGO_DB)
// console.log('MONGO_URL: ', MONGO_URL)
// console.log(process.env)

// typeorm
const environment = {
	dev: {
		url: MONGO_URL
	},
	default: {
		url: MONGO_URL
	},
	prod: {
		url: MONGO_URL
		// host: 'localhost',
		// port: MONGO_PORT!,
		// username: '',
		// password: '',
		// database: MONGO_DB!,
	}
}
const TYPEORM = environment[NODE_ENV]

// jsonwebtoken
const ISSUER: string = ConfigEnvironment.getEnvPath('ISSUER') || 'Chnirt corp'
const AUDIENCE: string = process.env.AUDIENCE || 'http://chnirt.github.io'
const ACCESS_TOKEN_SECRET: string =
	ConfigEnvironment.getEnvPath('ACCESS_TOKEN_SECRET') || 'access-token-key'
const REFRESH_TOKEN_SECRET: string =
	ConfigEnvironment.getEnvPath('REFRESH_TOKEN_SECRET') || 'refresh-token-key'
const EMAIL_TOKEN_SECRET: string =
	ConfigEnvironment.getEnvPath('EMAIL_TOKEN_SECRET') || 'email-token-key'
const RESETPASS_TOKEN_SECRET: string =
	ConfigEnvironment.getEnvPath('RESETPASS_TOKEN_SECRET') ||
	'resetpass-token-key'

// bcrypt
const BCRYPT_SALT: number = +ConfigEnvironment.getEnvPath('BCRYPT_SALT') || 10

// nodemailer
const NODEMAILER_USER: string =
	ConfigEnvironment.getEnvPath('NODEMAILER_USER') || 'xxx'
const NODEMAILER_PASS: string =
	ConfigEnvironment.getEnvPath('NODEMAILER_PASS') || 'xxx'

// passport
const GOOGLE_CLIENT_ID: string =
	ConfigEnvironment.getEnvPath('GOOGLE_CLIENT_ID') || 'xxx'
const GOOGLE_CLIENT_SECRET: string =
	ConfigEnvironment.getEnvPath('GOOGLE_CLIENT_SECRET') || 'xxx'

const FACEBOOK_APP_ID: string =
	ConfigEnvironment.getEnvPath('FACEBOOK_APP_ID') || 'xxx'
const FACEBOOK_APP_SECRET: string =
	ConfigEnvironment.getEnvPath('FACEBOOK_APP_SECRET') || 'xxx'

export {
	NODE_ENV,
	AUTHOR,
	PRIMARY_COLOR,
	DOMAIN,
	PORT,
	END_POINT,
	RATE_LIMIT_MAX,
	TYPEORM,
	STATIC,
	MONGO_PORT,
	MONGO_HOST,
	MONGO_DB,
	MONGO_PASS,
	MONGO_USER,
	AUDIENCE,
	ISSUER,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET,
	RESETPASS_TOKEN_SECRET,
	EMAIL_TOKEN_SECRET,
	BCRYPT_SALT,
	NODEMAILER_USER,
	NODEMAILER_PASS,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET
}
