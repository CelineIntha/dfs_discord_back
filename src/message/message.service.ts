// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { Utilisateur, UtilisateurDocument } from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Utilisateur.name) private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdMessageDto: any): Promise<Message> {
    const createdMessage = new this.messageModel(createdMessageDto);
    return createdMessage.save();
  }

  async findAllPublic(): Promise<Message[]> {
    return this.messageModel.find({ public: true }).exec();
  }

  async findAllMessagesfromSalon(salonId: string): Promise<Message[]> {
    return this.messageModel
      .find({ _id_salon: salonId })
      .populate('_id_utilisateur', 'prenom nom urlAvatar')
      .exec();
  }

  // async findAllMessagesfromSalon(idSalon): Promise<Message[]> {
  //   return this.messageModel.find({ _id_salon: idSalon });
  // }


}
