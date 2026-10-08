import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "src/dtos/create-user.dto";
import SetUserRoleDto from "src/dtos/set-user-role.dto";
import Billing from "src/entities/billing.entity";
import User from "src/entities/user.entity";
import type { SessionUser } from "src/types/user";
import { LocationService } from "src/location/location.service";
import { UserRole } from "src/types/user";
import { ArrayContains, FindOneOptions, Repository } from "typeorm";
import Notification from "src/entities/notification.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly locationService: LocationService,
  ) {}

  async getUsersAs(actor: SessionUser): Promise<User[]> {
    if (actor.role >= UserRole.ADMIN) {
      return await this.getUsers();
    }

    return [await this.getUser(actor.id)];
  }

  async getUserAs(id: string, actor: SessionUser): Promise<User> {
    this.assertCanReadUser(actor, id);
    return await this.getUser(id);
  }

  private assertCanReadUser(actor: SessionUser, id: string) {
    if (actor.role >= UserRole.ADMIN) return;

    if (actor.id !== id) {
      throw new ForbiddenException("You can only read your own user record");
    }
  }

  async saveUser(user: User) {
    return await this.userRepository.save(user);
  }

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

  async findUser(options: FindOneOptions<User>) {
    try {
      const user = await this.userRepository.findOne(options);

      if (!user) {
        throw new HttpException(`Could not find user`, HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (cause) {
      throw new HttpException(
        `Error finding user`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        bookings: true,
        billing: true,
        watchlist: true,
      },
    });

    if (!user) {
      throw new HttpException(
        `Could not find user ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async createUser({ name, email }: CreateUserDto) {
    const existing = await this.userRepository.findOneBy({ email });

    if (existing) {
      throw new ConflictException(`A user with email ${email} already exists`);
    }

    try {
      const billing = new Billing();
      await this.userRepository.manager.save(billing);

      const user = new User();
      user.billing = billing;
      user.name = name;
      user.email = email;

      await this.userRepository.manager.save(user);
      // todo: add notification

      return {
        id: user.id,
        name,
        email,
        billing,
      };
    } catch (cause) {
      throw new HttpException(
        `Error creating user ${name}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause,
        },
      );
    }
  }

  async setRole(id: string, { role, locationId }: SetUserRoleDto) {
    const user = await this.getUser(id);

    user.role = role;

    if (role === UserRole.MANAGER) {
      if (!locationId) {
        throw new BadRequestException("A manager must be given a locationId");
      }

      await this.locationService.getLocation(locationId);
      user.locationId = locationId;
    } else {
      user.locationId = null;
    }

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      locationId: user.locationId,
    };
  }



  async addToWatchlist({
    userId,
    locationId,
  }: {
    userId: string;
    locationId: string;
  }) {
    const user = await this.getUser(userId);
    const location = await this.locationService.getLocation(locationId);

    user.watchlist.push(location);
    await this.userRepository.save(user);
    return {
      status: 200,
      message: "Location added to users watchlist!",
    };
  }

  async getUsersWhoAreWatching(locationId: string) {
    const location = await this.locationService.getLocation(locationId);

    return await this.userRepository.find({
      where: { watchlist: ArrayContains([location]) },
    });
  }

  async getAdmins() {
    return await this.userRepository.findBy({
      role: UserRole.ADMIN,
    });
  }

  async deleteUser(id: string) {
    try {
      await this.userRepository.delete({
        id,
      });

      return {
        status: 200,
        message: `Successfully deleted user ${id}`,
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
}
