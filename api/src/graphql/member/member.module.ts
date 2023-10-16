import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  providers: [PrismaService],
})
export class MemberModule {}
