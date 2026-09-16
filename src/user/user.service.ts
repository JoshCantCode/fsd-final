import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "src/dtos/create-user.dto";
import User from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async createUser({ name, email }: CreateUserDto) {
    return await this.userRepository.insert({
      name,
      email,
    });
  }
}
