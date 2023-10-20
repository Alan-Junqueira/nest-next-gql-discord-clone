import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateServerDTO {
  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  profileId: string;
}
