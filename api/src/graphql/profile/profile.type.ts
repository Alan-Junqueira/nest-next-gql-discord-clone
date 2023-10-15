import { Field, ObjectType } from '@nestjs/graphql';
import { Channel, Server } from '../server/server.types';

@ObjectType()
export class Profile {
  @Field()
  id: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Server], { nullable: 'itemsAndList' })
  servers: Server[];

  @Field()
  imageUrl: string;

  @Field(() => [Channel], { nullable: 'itemsAndList' })
  channels: Channel[];
}
