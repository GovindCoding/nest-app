import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './user/entity/user.entity';
import { EmailTemplates } from './email-templates/entity/email-templates.entity';
import { EmailTemplatesController } from './email-templates/email-templates.controller';
import { EmailTemplatesService } from './email-templates/email-templates.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Anka@1234',
      database: 'node_app',
      entities: [User, EmailTemplates],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, EmailTemplates]),
  ],
  controllers: [
    AppController,
    ItemsController,
    UserController,
    EmailTemplatesController,
  ],
  providers: [AppService, ItemsService, UserService, EmailTemplatesService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
