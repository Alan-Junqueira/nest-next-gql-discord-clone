import { Module } from '@nestjs/common';
import { ServerResolver } from './server.resolver';
import { ServerService } from './server.service';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ServerResolver, ServerService, PrismaService, JwtService],
})
export class ServerModule {}
