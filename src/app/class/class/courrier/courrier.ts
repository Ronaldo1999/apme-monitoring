export class Courrier {
       courrierID: any;
       organisationID!: string;
       exerciceID!: string;
       structureID!: string;
       postetraitementID!: string;
       typeCourrierID!: string;
       sensibiliteID!: string;
       objet: any;
       reference!: string;
       date!: Date;
       time!: string;
       deposant!: string
       lieuprovenance!: string;
       lieudestination!: string
       referenceAnterieure!: string;
       classeur!: string;
       userupdate!: string;
       ipupdate!: string;
       lastupdate!: string;
       etat!: number;
       libellePte: string = ''
       libellePtr: string = ''
       flux!: string
       validite!: boolean
       pte!: string
       ptr!: string
       nbrPiece!: number
       archive!:number
       dateCloture!:Date
       dateCreation!:Date
       dateArchivage!:Date
       uid!:string
       courrierParentID!:string
       version!:number
       visa!:number

       constructor(_courrierID: string, _organisationID: string, _exerciceID: string, _structureID: string, _postetraitementID: string, _typeCourrierID: string
              , _sensibiliteID: string, _objet: string, _reference: string, _date: Date, _referenceAnterieure: string, _classeur: string) {

              this.courrierID = _courrierID;
              this.organisationID = _organisationID;
              this.exerciceID = _exerciceID;
              this.structureID = _structureID;
              this.postetraitementID = _postetraitementID;
              this.typeCourrierID = _typeCourrierID;
              this.sensibiliteID = _sensibiliteID;
              this.objet = _objet;
              this.reference = _reference;
              this.date = _date;
              this.referenceAnterieure = _referenceAnterieure;
              this.classeur = _classeur;

       }
}
