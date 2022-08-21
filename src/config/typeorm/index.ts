import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
// import { getMetadataArgsStorage } from 'typeorm'
import { TYPEORM } from '@environments'
import { MyLogger } from '../logger'

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	private readonly logger: MyLogger = new MyLogger(TypeOrmService.name)

	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		this.logger.debug(
			`--------------TYPEORM: ${JSON.stringify(TYPEORM)}-------------------`
		)
		// this.logger.debug(`--------------MONGO_DB: ${MONGO_DB}-------------------`)
		// this.logger.debug(`--------------MONGOPORT: ${MONGO_PORT}-------------------`)
		return {
			...TYPEORM,
			type: 'mongodb',
			// host: MONGO_HOST,
			// database: MONGO_DB,
			// port: MONGO_PORT,
			// username: MONGO_USER,
			// password: MONGO_PASS,
			// entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
			entities: ['../../entities/*.entity.ts'],
			synchronize: true,
			autoLoadEntities: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			authSource: 'admin',
			keepConnectionAlive: true,
			logging: true
		}
	}
}
