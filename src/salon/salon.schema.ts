import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Serveur } from '../serveur/serveur.schema';
import { Utilisateur } from 'src/utilisateur/utilisateur.schema';

export type SalonDocument = Salon & Document;

@Schema()
export class Salon {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  nom: string;

  @Prop()
  public: boolean;

  // @Prop()
  // urlLogo: string;

  @Prop({ type: Types.ObjectId, ref: 'Serveur', required: true })
  _id_serveur: Types.ObjectId;

  // @Prop({ type: Types.ObjectId, ref: 'Utilisateur', required: true })
  // _id_utilisateur: Types.ObjectId;

  @Prop()
  salons: Utilisateur[];

}

export const SalonSchema = SchemaFactory.createForClass(Salon);
