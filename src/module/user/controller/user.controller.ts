import { Injectable } from "@nestjs/common";
import { UserService } from "../service/user.service";

@Injectable()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  async createNewUser() {
    return this.userService.createUser();
  }

  async getUserList() {
    return this.userService.getUserList();
  }
}
