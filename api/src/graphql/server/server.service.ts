import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateServerDTO } from './dtos/CreateServerDTO';
import { randomUUID } from 'node:crypto';
import { MemberRole } from '../member/member.types';
import { GraphQLError } from 'graphql';

@Injectable()
export class ServerService {
  constructor(private readonly prisma: PrismaService) {}

  async createServer(input: CreateServerDTO, imageUrl: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id: input.profileId,
      },
    });

    if (!profile) {
      throw new BadRequestException('Profile not found');
    }

    return this.prisma.server.create({
      data: {
        ...input,
        imageUrl,
        inviteCode: randomUUID(),
        channels: {
          create: [
            {
              name: 'general',
              profileId: input.profileId,
            },
          ],
        },
        members: {
          create: [
            {
              profileId: input.profileId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
      include: {
        members: true,
      },
    });
  }

  async getServer(id: string, email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      throw new GraphQLError('Profile not found', {
        extensions: {
          code: 'PROFILE_NOT_FOUND',
        },
      });
    }

    const server = await this.prisma.server.findUnique({
      where: {
        id,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });

    if (!server) {
      throw new GraphQLError('Server not found', {
        extensions: {
          code: 'SERVER_NOT_FOUND',
        },
      });
    }
    return server;
  }

  async getServersByProfileEmailOfMember(email: string) {
    const servers = await this.prisma.server.findMany({
      where: {
        members: {
          some: {
            profile: {
              email,
            },
          },
        },
      },
    });

    return servers;
  }
}
