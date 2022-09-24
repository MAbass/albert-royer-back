import { Module } from "@nestjs/common";
import { RoleController } from "@controllers";
import { RoleService } from "@services";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "@entities";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
