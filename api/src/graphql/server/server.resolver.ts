import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Server } from './server.types';
import { Request } from 'express';
import { GraphQLError } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';
import { ServerService } from './server.service';
import { CreateServerDTO } from './dtos/CreateServerDTO';
import * as GraphqlUpload from 'graphql-upload/GraphQLUpload.js';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';
import { createWriteStream } from 'node:fs';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class ServerResolver {
  constructor(private readonly serverService: ServerService) {}

  @Query(() => [Server])
  async getServers(
    @Args('profileId') profileId: string,
    @Context() ctx: { req: Request },
  ) {
    if (!ctx.req?.profile?.email) {
      return new GraphQLError('Profile not found', {
        extensions: {
          code: 'PROFILE_NOT_FOUND',
        },
      });
    }

    const servers = this.serverService.getServersByProfileEmailOfMember(
      ctx.req.profile.email,
    );

    return servers;
  }

  @Mutation(() => Server)
  async createServer(
    @Args('input') input: CreateServerDTO,
    @Args('file', { type: () => GraphqlUpload, nullable: true })
    file: GraphqlUpload,
  ) {
    let imageUrl: string;

    if (file) {
      imageUrl = await this.storeImageAngGetUrl(file);
    }

    const server = this.serverService.createServer(input, imageUrl);

    return server;
  }

  private async storeImageAngGetUrl(file: GraphqlUpload) {
    const { createReadStream, filename } = await file;
    const fileName = `${randomUUID()}-${filename}`;
    const imagePath = join(process.cwd(), 'public', 'images', fileName);
    const imageUrl = `${process.env.API_BASE_URL}/images/${fileName}`;

    const stream = createReadStream();
    stream.pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}
