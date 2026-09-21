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
    return await this.userRepository.find({
      relations: {
        bookings: true,
        billing: true,
      },
    });
  }

  async getUser(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        bookings: true,
        billing: true,
      },
    });
  }

  async createUser({ name, email }: CreateUserDto) {
    // create billing object
    const billing = new Billing();
    await this.userRepository.manager.save(billing);

    // create user and add the billing object to it
    const user = new User();
    user.billing = billing;
    user.name = name;
    user.email = email;
    await this.userRepository.manager.save(user);

    return {
      name,
      email,
      billing,
    };
  }
}
