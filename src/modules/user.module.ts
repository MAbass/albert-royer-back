import { Module } from '@nestjs/common'
import { UserService } from '@services'
import { UserController } from '@controllers'
import { RoleModule } from './role.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@entities'

@Module({
	imports: [TypeOrmModule.forFeature([User]), RoleModule],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
