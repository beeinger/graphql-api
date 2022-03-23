import { DirectiveLocation, GraphQLDirective, printSchema } from "graphql";
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from "@nestjs/graphql";

import { DateScalar } from "./common/scalars/date.scalar";
import { NestFactory } from "@nestjs/core";
import { RecipesResolver } from "./recipes/recipes.resolver";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { writeFile } from "fs";

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  let schema = await gqlSchemaFactory.create([RecipesResolver], [DateScalar], {
    directives: [
      new GraphQLDirective({
        name: "upper",
        locations: [DirectiveLocation.FIELD_DEFINITION],
      }),
    ],
  });
  await app.close();

  schema = upperDirectiveTransformer(schema, "upper");

  console.log(schema);

  writeFile(
    process.cwd() + `/schema.gql`,
    printSchema(schema),
    (err) => err && console.error("Error writing schema to file", err)
  );
}
generateSchema();
