import { Module } from '@nestjs/common'
import { RoleController } from '../controllers/role.controller'
import { RoleService } from '@services'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from '@entities'

@Module({
	imports: [TypeOrmModule.forFeature([Role])],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService]
})
export class RoleModule {}
