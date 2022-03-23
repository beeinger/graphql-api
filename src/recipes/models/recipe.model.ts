import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: "recipe " })
export class Recipe {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: string;

  @Directive("@upper")
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  ingredients: string[];
}
