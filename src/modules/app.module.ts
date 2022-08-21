import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { CacheService, TypeOrmService } from '@config'
import { UserModule } from './user.module'
import { RoleModule } from './role.module'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService
		}),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
		ScheduleModule.forRoot(),
		UserModule,
		RoleModule
	]
})
export class AppModule {}
