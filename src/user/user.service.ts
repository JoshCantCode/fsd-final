import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "src/dtos/create-user.dto";
import Billing from "src/entities/billing.entity";
import User from "src/entities/user.entity";
import { UserRole } from "src/types/user";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    // fetch all users with their relationships loaded
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
    // fetch one user with their relationships loaded

    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: {
          bookings: true,
          billing: true,
        },
      });

      if (!user) {
        throw new HttpException(
          `Could not find user ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (cause) {
      throw new HttpException(
        `Error finding user ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }

  async createUser({ name, email, role }: CreateUserDto) {
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
        if (role && role == 2) {
          user.role = UserRole.ADMIN;
        }
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
      // create a key with base64
      const key = btoa(`${name}-${email}`);
      if (role == 2) {
        return {
          name,
          email,
          billing,
          key,
        };
      } else {
        return {
          name,
          email,
          billing,
        };
      }
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

  async deleteUser(id: string) {
    try {
      await this.userRepository.delete({
        id,
      });

      return {
        status: 200,
        message: `Successfully deleted user #{id}`,
      };
    } catch (cause) {
      throw new HttpException(
        `Error deleting user ${id}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }

  async checkAdminKey(key: string): Promise<boolean> {
    const [name, email] = atob(key).split("-");
    console.log(atob(key));
    console.log(name, email);
    const admin = await this.userRepository.findOneBy({
      name,
      email,
      role: UserRole.ADMIN,
    });

    return admin != null;
  }
}
