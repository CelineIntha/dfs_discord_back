import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Utilisateur, UtilisateurSchema } from './utilisateur.schema';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { Serveur, ServeurSchema } from 'src/serveur/serveur.schema';
import { Salon, SalonSchema } from 'src/salon/salon.schema';
import { Message, MessageSchema } from 'src/message/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Utilisateur.name, schema: UtilisateurSchema },
      { name: Serveur.name, schema: ServeurSchema },
      { name: Salon.name, schema: SalonSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
})
export class UtilisateurModule {}
