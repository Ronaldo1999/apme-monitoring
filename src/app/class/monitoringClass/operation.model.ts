import { MoIndicateur } from "./indicateur.model";
import { MoMemoireDepense } from "./memoire-depense.model";

export class MoOperation {
    moOperationID!: string;
    moniActiviteARealiserID!: string;
    operationBudgetaireID!: string;
    libelleFr!: string;
    libelleUs!: string;
    indicateur!: string;
    objectif!: string;
    montant!: number;
    dateDebut!: string;
    dateFin!: string;
    resultatFr!: string;
    resultatUs!: string;
    indicateurFr!: string;
    indicateurUs!: string;
    sourceVerificationFr!: string;
    sourceVerificationUs!: string;
    AE!: string;
    CP!: string;
    CompteCode!: string;
    financementID!: string;
    structureID!: string;
    activiteBudgetiseID!: string;
    posteComptableID!: string;
    ordreDansActivite!: string;
    AEReport!: string;
    CPReport!: string;
    AEInitial!: string;
    CPInitial!: string;
    AEAdditif!: string;
    CPAdditif!: string;
    calendrier!: string;
    pgCode!: string;
    acCode!: string;
    activiteParentFr!: string;
    numordre!: string;
    cpblocage!: string;
    budget!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    created_at!: string;
    created_by!: string;
    color!: string;
    visibilte!: string;
    organisationID!: string;
    millesime!: string;

    indicateurs: MoIndicateur[] = [];
    operationComptes: MoOperationCompte[] = [];
    
}


export class MoOperationCompte {
    moOperationCompteID!: any;
    moOperationID!: any;
    operationBudgetaireID!: any;
    libelleFr!: any;
    libelleUs!: any;
    montant!: any;
    quantite!: any;
    last_update!: any;
    user_update!: any;
    ip_update!: any;
    created_at!: any;
    created_by!: any;
    organisationID!: any;
    millesime!: any;
}