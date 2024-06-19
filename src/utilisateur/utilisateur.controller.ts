import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';

@Controller('utilisateur')
export class UtilisateurController {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) { }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Request() req) {
    const email = req.user.sub;
    return this.utilisateurService.findByEmail(email);
  }

  @Post('inscription')
  async inscription(@Body() createUtilisateurDto: any) {
    //TODO : vérifier les donnée (regles mot de passe, email unique ...)

    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Post('login')
  async create(@Body() utilisateurDto: any) {
    const utilisateur =
      await this.utilisateurService.getByEmailAndClearPassword(
        utilisateurDto.email,
        utilisateurDto.password,
      );

    const payload = {
      sub: utilisateur.email,
    };

    return await this.jwtService.signAsync(payload);
  }

  @Post('rejoindre-serveur')
  @UseGuards(AuthGuard)
  async rejoindreServeur(
    @Body() serveurArejoindreDto: any,
    @Request() requete,
  ) {
    const email = requete.user.sub;

    return this.utilisateurService.rejoindreServeur(
      email,
      serveurArejoindreDto._id,
    );
  }

  @Post('block/:serveurId/:userId')
  @UseGuards(AuthGuard) 
  async blockUser(
    @Param('serveurId') serveurId: string,
    @Param('userId') userIdToBlock: string,
    @Request() req,
  ) {
    const email = req.user.sub;

    return this.utilisateurService.blockUser(email, serveurId, userIdToBlock);
  }

}
