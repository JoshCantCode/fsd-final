import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 200,
      message: "Hello world!",
    };
  }
}
