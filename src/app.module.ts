import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { DirectiveLocation, GraphQLDirective } from "graphql";
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from "@nestjs/graphql";

import { DateScalar } from "./common/scalars/date.scalar";
import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { RecipesModule } from "./recipes/recipes.module";
import { RecipesResolver } from "./recipes/recipes.resolver";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";

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

  app.close();
  return upperDirectiveTransformer(schema, "upper");
}

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      // autoSchemaFile: "schema.gql",
      autoSchemaFile: false,
      playground: true,
      introspection: true,
      typePaths: ["**/*.gql"],
      transformSchema: async (schema) =>
        upperDirectiveTransformer(schema, "upper"),
    }),
  ],
})
export class AppModule {}
