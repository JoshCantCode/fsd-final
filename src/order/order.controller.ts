import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { OrderService } from "./order.service";
import { type CreateOrderDto } from "src/dtos/create-order.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.orderService.getOrder(id);
  }
}
