import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { GraphQLModule } from "@nestjs/graphql";
import { Module } from "@nestjs/common";
import { RecipesModule } from "./recipes/recipes.module";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
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
