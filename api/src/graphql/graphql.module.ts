import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { MemberModule } from './member/member.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [ProfileModule, MemberModule, ServerModule],
})
export class GraphqlModule {}
