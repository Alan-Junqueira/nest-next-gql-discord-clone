import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphqlResolver } from './graphql/graphql.resolver';
import { GraphqlService } from './graphql/graphql.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
    }),
    GraphQLModule.forRootAsync({
      imports: [],
      inject: [],
      driver: ApolloDriver,
      useFactory: async () => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
          sortSchema: true,
          subscriptions: {},
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, GraphqlService, GraphqlResolver],
})
export class AppModule {}
