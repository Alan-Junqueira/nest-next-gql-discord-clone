import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Profile } from './profile.type';
import { createProfileDTO } from './dtos/createProfileDTO';
import { ProfileService } from './profile.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/auth/auth.guard';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Profile)
  async createProfile(@Args('input') input: createProfileDTO) {
    return this.profileService.createProfile(input);
  }

  @Query(() => Profile)
  async getProfileById(@Args('profileId') profileId: string) {
    return this.profileService.getProfileById(profileId);
  }

  @Query(() => Profile)
  async getProfileByEmail(@Args('profileEmail') profileEmail: string) {
    return this.profileService.getProfileByEmail(profileEmail);
  }
}
