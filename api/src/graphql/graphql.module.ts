import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { MemberModule } from './member/member.module';
import { ServerModule } from './server/server.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ProfileModule, MemberModule, ServerModule, DatabaseModule],
})
export class GraphqlModule {}
