import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './database/database.module';

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
    GraphqlModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
