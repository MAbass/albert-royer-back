import { CacheModule, forwardRef, Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheService, MongooseConfigService } from '@config'
import { RecipientModule, RoleModule, UserModule } from '@modules'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
	imports: [
		forwardRef(() => RoleModule),
		forwardRef(() => UserModule),
		forwardRef(() => RecipientModule),
		MongooseModule.forRootAsync({
			useClass: MongooseConfigService
		}),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
		ScheduleModule.forRoot()
	]
})
export class AppModule {}
