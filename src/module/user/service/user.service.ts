import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser() {
    return this.userRepository.createAnyUser();
  }

  async getUserList() {
    return this.userRepository.findUserList();
  }
}
