import { Injectable } from "@nestjs/common";
// import { getMetadataArgsStorage } from 'typeorm'
import {
  MONGO_DB,
  MONGO_HOST,
  MONGO_PASS,
  MONGO_PORT,
  MONGO_USER,
  TYPEORM
} from "@environments";
import { MyLogger } from "../logger";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory
} from "@nestjs/mongoose";

/*@Injectable()
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
			entities: ['../../entities/!*.entity.ts'],
			synchronize: false,
			autoLoadEntities: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			authSource: 'admin',
			keepConnectionAlive: true,
			logging: true
		}
	}
}*/
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private readonly logger: MyLogger = new MyLogger(MongooseConfigService.name);

  createMongooseOptions(): MongooseModuleOptions {
    this.logger.debug(
      `--------------TYPEORM: ${JSON.stringify(TYPEORM)}-------------------`
    );
    return {
      uri: `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
    };
  }
}
