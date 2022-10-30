import { Injectable } from "@nestjs/common";

import { MyLogger } from "../logger";
import {
  MongooseModuleOptions,
  MongooseOptionsFactory
} from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

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

  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const hostname = this.configService.get("MONGO_HOST");
    const port = this.configService.get("MONGO_PORT");
    const database = this.configService.get("MONGO_DATABASE");

    return {
      uri: `mongodb://${hostname}:${port}/${database}`
    };
  }
}
