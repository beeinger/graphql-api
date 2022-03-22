import { Injectable } from "@nestjs/common";

@Injectable()
export class CatsService {
  getAllCats(): string {
    return "This action returns all cats";
  }
}
