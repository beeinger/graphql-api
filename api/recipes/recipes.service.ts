import { Injectable } from "@nestjs/common";
import { NewRecipeInput } from "./dto/new-recipe.input";
import { Recipe } from "./models/recipe.model";
import { RecipesArgs } from "./dto/recipes.args";

@Injectable()
export class RecipesService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(data: NewRecipeInput): Promise<Recipe> {
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findOneById(id: string): Promise<Recipe> {
    return {
      id: "1",
      title: "RECIPE 1",
      description: "Lorem ipsum",
      creationDate: new Date(),
      ingredients: ["ingredient 1", "ingredient 2"],
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [
      {
        id: "1",
        title: "RECIPE 1",
        description: "Lorem ipsum",
        creationDate: new Date(),
        ingredients: ["ingredient 1", "ingredient 2"],
      },
      {
        id: "2",
        title: "RECIPE 2",
        description: "Lorem ipsum",
        creationDate: new Date(),
        ingredients: ["ingredient 3", "ingredient 4"],
      },
      {
        id: "3",
        title: "RECIPE 3",
        description: "Lorem ipsum",
        creationDate: new Date(),
        ingredients: ["ingredient 5", "ingredient 6"],
      },
    ] as Recipe[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async remove(id: string): Promise<boolean> {
    return true;
  }
}
