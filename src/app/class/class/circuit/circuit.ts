export class Circuit {

   structureID: string = '';
   courrierID: string = '';
   objet: string = '';
   libelleFr: string = '';
   libelleUs: string = '';
   rang: number = 0;
   observation: string = '';
   visa!: boolean
   viseur!: boolean
   dateVisa!: string
   user_update!:string

   constructor(_structureID: string, _courrierID: string, _objet: string, _libelleFr: string, _libelleUs: string, _rang: number, _observation: string, _visa: boolean, _viseur: boolean) {
      this.structureID = _structureID
      this.courrierID = _courrierID
      this.objet = _objet
      this.libelleFr = _libelleFr
      this.rang = _rang
      this.visa = _visa
      this.viseur = _viseur
      this.observation = _observation
   }

}
