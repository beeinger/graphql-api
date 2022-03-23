import { DateScalar } from "../common/scalars/date.scalar";
import { Module } from "@nestjs/common";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";

@Module({
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule {}
