import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { Role, RoleDocument } from "@entities";
import { AddRoleDTO } from "@validations";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoleModel } from "@models";

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger(RoleService.name);

  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async addRole(role: AddRoleDTO): Promise<Role> {
    const roleSearch: Role = await this.roleModel.findOne({
      name: role.name
    });

    if (roleSearch) {
      throw new ConflictException(`The role ${roleSearch.name} already exist.`);
    }
    const roleToSave: Role = new Role();
    roleToSave.name = role.name;
    const roleSaved = new this.roleModel(roleToSave);

    return roleSaved.save();
  }

  async getRoleByName(name: string) {
    return this.roleModel.findOne({ name });
  }

  async getRoleById(id: string) {
    return this.roleModel.findById(id);
  }

  async getRoles() {
    const searchResult = await this.roleModel.find({});

    return Promise.all(
      searchResult.map(async data => {
        const model = new RoleModel(data);
        return model.getResource();
      })
    );
  }
}
