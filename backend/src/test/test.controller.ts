import { Controller, Get } from "@nestjs/common";

@Controller("test")
export class TestController {
  @Get()
  getTest(): object {
    return { message: "Test endpoint funcionando", timestamp: new Date() };
  }
}
