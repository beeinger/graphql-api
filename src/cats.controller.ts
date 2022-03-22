import { Controller, Get, Put } from "@nestjs/common";

import { CatsService } from "./cats.service";

@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(): string {
    return this.catsService.getAllCats();
  }

  @Put()
  smthn(): string {
    return this.catsService.getAllCats();
  }
}
