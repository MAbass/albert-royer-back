import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Recipient, RecipientSchema } from "@entities";
import { UserModule } from "./user.module";
import { RecipientService } from "@services";
import { RecipientController } from "../controllers/recipient.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipient.name, schema: RecipientSchema }
    ]),
    forwardRef(() => UserModule)
  ],
  exports: [MongooseModule],
  providers: [RecipientService],
  controllers: [RecipientController]
})
export class RecipientModule {}
