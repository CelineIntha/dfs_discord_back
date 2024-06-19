// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';
import {
  Serveur,
  ServeurDocument,
} from 'src/serveur/serveur.schema';
import { Utilisateur, UtilisateurDocument } from 'src/utilisateur/utilisateur.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdSalonDto: any): Promise<Salon> {
    const createdSalon = new this.salonModel(createdSalonDto);
    return createdSalon.save();
  }

  async findAllPublic(): Promise<Salon[]> {
    return this.salonModel.find({ public: true });
  }

  async findAllFromServer(idServer: string): Promise<Salon[]> {

    console.log(idServer);
    return this.salonModel.find({ _id_serveur: idServer });
  }

  async findAllSalonOfUser(email: string): Promise<Salon[]> {
    const utilisateur = await this.utilisateurModel.findOne({ email });

    const salons = await this.salonModel.find({
      _id: { $in: utilisateur.salons },
    });

    return salons;
  }

}
