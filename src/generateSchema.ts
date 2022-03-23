import * as dree from "dree";

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
  const schema = await gqlSchemaFactory.create(
    [RecipesResolver],
    [DateScalar],
    {
      directives: [
        new GraphQLDirective({
          name: "upper",
          locations: [DirectiveLocation.FIELD_DEFINITION],
        }),
      ],
    }
  );
  await app.close();

  const schemaPrint = printSchema(upperDirectiveTransformer(schema, "upper"));

  const string = dree.parse(process.cwd(), {
    exclude: [/node_modules/, /dist/, /.git/],
  });
  console.log(string);

  writeFile(process.cwd() + `/public/schema.gql`, schemaPrint, (err) =>
    err
      ? console.error("Error writing schema to file", err)
      : console.log("\nGenerated graphql schema.")
  );
}
generateSchema();
