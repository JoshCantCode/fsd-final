import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateOrderDto } from "src/dtos/create-order.dto";
import Order from "src/entities/order.entity";
import { ListingService } from "src/listing/listing.service";
import { UserService } from "src/user/user.service";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly listingService: ListingService,
  ) {}

  async createOrder(body: CreateOrderDto) {
    const user = await this.userService.getUser(body.userId);
    const listing = await this.listingService.getListing(body.listingId);

    const { arrival, departure } = body;

    if (isNaN(Number(arrival)) || isNaN(Number(departure))) {
      throw new HttpException(
        "Arrival or Departure value cannot be parsed into a number!",
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = new Order();
    order.user = user;
    order.listing = listing!;
    order.arrival = new Date(Number(arrival) * 1000);
    order.departure = new Date(Number(departure) * 1000);

    return await this.orderRepository.save(order);
  }

  async findAll() {
    return await this.orderRepository.find({
      relations: { listing: true, user: true },
    });
  }

  async getOrder(id: string) {
    return await this.orderRepository.findOneBy({ id });
  }
}
