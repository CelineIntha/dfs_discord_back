import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utilisateur, UtilisateurDocument } from './utilisateur.schema';
import * as bcrypt from 'bcrypt';
import { Serveur, ServeurDocument } from 'src/serveur/serveur.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
    @InjectModel(Serveur.name)
    private serveurModel: Model<ServeurDocument>,
  ) {}

  async getByEmailAndClearPassword(
    email: string,
    clearPassword: string,
  ): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurModel.findOne({ email: email });

    if (utilisateur && bcrypt.compare(clearPassword, utilisateur.password)) {
      return utilisateur;
    }

    return null;
  }

  async create(createdUtilisateurDto: any): Promise<Utilisateur> {
    const createdUtilisateur = new this.utilisateurModel(createdUtilisateurDto);

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createdUtilisateur.password, saltOrRounds);
    createdUtilisateur.password = hash;

    return createdUtilisateur.save();
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurModel.find().exec();
  }

  async rejoindreServeur(
    email: string,
    idServeurArejoindre: number,
  ): Promise<Utilisateur> {
    //on ajoute le serveur a la liste des serveurs de l'utilsiateur
    const utilisateur = await this.utilisateurModel.findOneAndUpdate(
      { email: email },
      { $addToSet: { serveurs: idServeurArejoindre } }, // $addToSet évite les duplications
      { new: true }, 
    );

    return utilisateur;
  }


  async findByEmail(email: string): Promise<Utilisateur> {
    return this.utilisateurModel.findOne({ email }).exec();
  }

  async blockUser(email: string, serveurId: string, userIdToBlock: string): Promise<Utilisateur> {
    const serveur = await this.serveurModel.findById(serveurId).populate('owner');
    
    if (!serveur) {
      throw new NotFoundException("Le serveur n'existe pas");
    }
  
    if (serveur.owner.toString() !== email) {
      throw new UnauthorizedException("Vous n'êtes pas le propriétaire du serveur");
    }
  
    const utilisateur = await this.utilisateurModel.findOneAndUpdate(
      { _id: userIdToBlock },
      { $addToSet: { blockedInServers: serveurId } },
      { new: true }
    ).populate('blockedInServers');
  
    if (!utilisateur) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  
    return utilisateur;
  }

  
}
