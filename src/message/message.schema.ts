import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Serveur } from '../serveur/serveur.schema';
import { Utilisateur } from 'src/utilisateur/utilisateur.schema';
import { Salon } from 'src/salon/salon.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true, minlength: 3, maxlength: 255 })
  contenu: string;

  @Prop({ type: Types.ObjectId, ref: 'Salon', required: true })
  _id_salon: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Utilisateur', required: true })
  _id_utilisateur: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
