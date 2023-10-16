import { Module } from '@nestjs/common';
import { ServerResolver } from './server.resolver';
import { ServerService } from './server.service';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [ServerResolver, ServerService, PrismaService],
})
export class ServerModule {}
