import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Profile } from '../profile/profile.type';
import { Member } from '../member/member.types';

@ObjectType()
export class Channel {
  @Field()
  id: string;

  @Field({
    nullable: true,
  })
  name: string;

  @Field(() => ChannelType)
  type: ChannelType;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field(() => [Member], { nullable: true })
  members: Member[];
}

export enum ChannelType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO',
}

registerEnumType(ChannelType, {
  name: 'ChannelType',
  description: 'Defines the type of channel',
});

@ObjectType()
export class Server {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  inviteCode: string;

  @Field()
  profileId: number;

  @Field(() => Profile, { nullable: true })
  profile: Profile;

  @Field(() => [Member], { nullable: 'itemsAndList' })
  members: Member[];

  @Field(() => [Channel], { nullable: 'itemsAndList' })
  channels: Channel[];
}
