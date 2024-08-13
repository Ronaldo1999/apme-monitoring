export class IndicateurCle {

    last_update!: string;
    user_update!: string;
    indicateurCleID!: string;
    indicateurID!: string;
    code!: string;
    bscID!: string; 
    organisationID!: string;
    structureID!: string;
    activiteID!: string;
    missionID!: string;
    libelleFr!: string;
    libelleUs!: string;
    responsable!: string;
    responsableAutre!: string;
    unite!: string;
    periodicite!: number;
    poids!: number;
    reference!: number;
    referenceAnnee!: string;
    dernierResultatConnu !: number;
    dernierResultatConnuAnnee!: string;
    cible!: number;
    cibleAnnee!: string;
    sourceDonnees!: string;
    sourceDonneesurl!: string;
    modeCollecte!: string;
    coutCollecte!: number;
    dcrID!: number;
    millesime!: string;
    numordre!: number;
    fusion!: number;
    libelleIndicateur!: string;
    libelleStructure!: string;
    abbrStructure!: string;

    note!: string;  taux!: number;
    bum!: number; buf!: number; but!: number;
    nbIndicateurs!: number;

    strbut!: number;
    strbuf!: number;
    strbum!: number;
    refbut!: number;
    refbuf!: number;
    refbum!: number;

    sousIndicateur!: number;

    details: IndicateurCle[] = [];
}
