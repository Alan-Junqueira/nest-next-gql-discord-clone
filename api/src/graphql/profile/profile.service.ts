import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProfileDTO } from './dtos/CreateProfileDTO';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createProfile(data: CreateProfileDTO) {
    const existingProfile = await this.prisma.profile.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingProfile) {
      return existingProfile;
    }

    const newProfile = await this.prisma.profile.create({
      data,
    });

    return newProfile;
  }

  async getProfileById(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
      include: {
        servers: {
          include: {
            channels: true,
          },
        },
      },
    });

    return profile;
  }

  async getProfileByEmail(email: string) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        email,
      },
      include: {
        servers: {
          include: {
            channels: true,
          },
        },
      },
    });

    return profile;
  }
}
