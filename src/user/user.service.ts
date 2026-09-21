import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
    const users = await this.userRepository.find({
      relations: {
        bookings: true,
        billing: true,
      },
    });

    if (!users) {
      throw new HttpException(
        "Could not fetch users",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return users;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        bookings: true,
        billing: true,
      },
    });

    if (!user) {
      throw new HttpException(
        `Couldn't find user with ID: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser({ name, email }: CreateUserDto) {
    // create billing object
    try {
      const billing = new Billing();
      await this.userRepository.manager.save(billing);

      // create user and add the billing object to it
      try {
        const user = new User();
        user.billing = billing;
        user.name = name;
        user.email = email;
        await this.userRepository.manager.save(user);
      } catch (cause) {
        throw new HttpException(
          `Error creating user ${name}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause,
          },
        );
      }

      return {
        name,
        email,
        billing,
      };
    } catch (cause) {
      throw new HttpException(
        `Error creating billing for user ${name}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }
}
