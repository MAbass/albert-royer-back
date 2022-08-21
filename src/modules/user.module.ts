import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserService } from '@services'
import { User } from '@entities'
import { UserController } from '@controllers'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
