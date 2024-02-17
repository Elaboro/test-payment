import { Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../service/user.service";

@ApiTags("user")
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: "Create user" })
  @Post("/user/create")
  async createNewUser() {
    return this.userService.createUser();
  }

  @ApiOperation({ summary: "Get user list" })
  @Get("/user/list")
  async getUserList() {
    return this.userService.getUserList();
  }
}
