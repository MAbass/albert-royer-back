import { forwardRef, Module } from '@nestjs/common'
import { UserService } from '@services'
import { UserController } from '@controllers'
import { User, UserSchema } from '@entities'
import { MongooseModule } from '@nestjs/mongoose'
import { RoleModule } from '@modules'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		forwardRef(() => RoleModule)
	],
	providers: [UserService],
	controllers: [UserController]
})
export class UserModule {}
