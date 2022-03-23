import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from "apollo-server-plugin-base";

import { Plugin } from "@nestjs/apollo";

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener> {
    console.log("Request started");
    return {
      async willSendResponse() {
        console.log("Will send response");
      },
    };
  }
}
