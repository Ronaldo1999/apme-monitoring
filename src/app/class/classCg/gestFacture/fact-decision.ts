import { CgObservation } from "./facture";

export class FactDecision {
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  decisionID!: string;
  reference!: string;
  dateSignature!: string;
  montant!: number;
  beneficiaire!: string;
  fournisseurID!: string;
  matricule!: string;
  structureBenefID!: string;
  tacheID!: string;
  organisationID!: string;
  millesime!: string;
  activiteID!: string;
  structureID!: string;
  modeleID!: string;
  objet!: string;
  signataire!: string;
  ordonnateur!: string;
  montantTVA!: number;
  montantIR!: number;
  montantHT!: number;
  montantTTC!: number;
  montantNAP!: number;
  numeroOPNap!: string;
  numeroOPTaxe!: string;
  rib!: string;
  groupe!: number;
  type!: number;
  trimestreID!: string;
  memoireID!: string;
  mandataire!: string;

  compteCode!: string;
  budget!: string;
  imputation!: string;
  memoireOperationID!: string;
  etat!: number;

  etatTrans!: number;
  stageType!: string;
  stageMontant!: number;
  stageMois!: number;
  frKm!: number;
  frNbPersonne!: number;
  frMontant!: number;

  numDossier!: string;
  organisationLibelle!: string;
  tpActionCode!: string;
  tpActionLibelle!: string;
  tpActiviteCode!: string;
  tpActiviteLibelle!: string;

  tpAnnee!: string;
  tpImputation!: string;
  tpLigneCompte!: string;
  tpLigneLibelle!: string;
  tpMontantIRNC!: string;
  tpPrecompte!: string;
  tpProgrammeCode!: string;
  tpProgrammeLibelle!: string;
  tpStructureCode!: string;
  tpTacheCode!: string;
  tpTacheLibelle!: string;
  tpTauxAutres!: string;
  tpTauxIR!: string;
  tpTauxIRNC!: string;
  tpTauxTVA!: string;
  createBy!: string;
  typeDecision!: number;
  ae!: number;
  cp!: number;
  visa!: number;
  visah!: number;
  visaD!: number;
  nbFois!: number;
  decision!: string;
  datedecision!: string;
  dateEmission!: string;
  dateEntre!: string;
  created_at!: string;
  dateSortie!: string;
  ligne!: string;

  listFormat: any[] = [];
  agentList: any[] = [];
  agents!: string;
  nom!: string;
  attrib!: string;
  dossierrangement!: string;
  observations!: CgObservation[];
}


export class DecisionDetail {
  last_update!: string;
  user_update!: string;
  ip_update!: string;
  decisionID!: string;
  reference!: string;
  dateSignature!: string;
  montant!: number;
  beneficiaire!: string;
  fournisseurID!: string;
  matricule!: string;
  structureBenefID!: string;
  tacheID!: string;
  organisationID!: string;
  millesime!: string;
  activiteID!: string;
  structureID!: string;
  modeleID!: string;
  objet!: string;
  signataire!: string;
  ordonnateur!: string;
  montantTVA!: number;
  montantIR!: number;
  montantHT!: number;
  montantTTC!: number;
  montantNAP!: number;
  numeroOPNap!: string;
  numeroOPTaxe!: string;
  rib!: string;
  groupe!: number;
  type!: number;
  trimestreID!: string;
  memoireID!: string;
  mandataire!: string;

  compteCode!: string;
  imputation!: string;
  etat!: number;

  etatTrans!: number;
  stageType!: string;
  stageMontant!: number;
  stageMois!: number;
  frKm!: number;
  frNbPersonne!: number;
  frMontant!: number;

  numDossier!: string;
 
  createBy!: string;
  typeDecision!: number;
  ae!: number;
  cp!: number;
  visa!: number;
  visah!: number;
  visaD!: number;
  nbFois!: number;
  decision!: string;
  dateEmission!: string;
  dateEntre!: string;
  dateSortie!: string;

  listFormat: any[] = [];
  agentList: any[] = [];
  agents!: string;
  nom!: string;
}

export class DecisionFormation {
    decisionformationID!:string;
    libelleFr!:string;
    libelleUs!:string;
    decisionID!:string;
    niveau!:string;
    last_update!:string;
    ip_update!:string;
    user_update!:string;
    montant!:number;
}

export class DecisionMandataire {
    mandataireID!:string;
    nom!:string;
    last_update!:string;
    ip_update!:string;
    user_update!:string;
}
export class ResultStat {
    bca!:number;
    decision!:number;
    mandat!:number;
    engagement!:number;
    lettreCommande!:number;
    marche!:number;
    fraisR!:number;
    fraisF!:number;
    retribution!:number;
    allocation!:number;
    ordremission!:number;
}
export class CgDecRangement {
    cgdecrangementID!:string;
    titre!:string;
    description!:string;
    couleur!:string;
    created_at!:string;
    created_by!:string;
    organisationID!:string;
    millesime!:string;
    last_update!:string;
    ip_update!:string;
    user_update!:string;
}



    