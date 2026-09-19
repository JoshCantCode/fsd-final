import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "src/dtos/create-user.dto";
import Billing from "src/entities/billing.entity";
import User from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  async createUser({ name, email }: CreateUserDto) {
    const billing = new Billing();
    return await this.userRepository.insert({
      name,
      email,
      billing,
    });
  }
}
