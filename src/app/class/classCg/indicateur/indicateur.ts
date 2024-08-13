import { IndicateurVar } from "../indicateurVar/indicateur-var"

export class Indicateur {

    last_update !: Date
    user_update !: string
    ip_update !: string
    indicateurID !: string
    indicateurCleID !: string
    compositeID !: string
    organisationID !: string
    millesime !: string
    structureID !: string
    activiteID !: string
    activiteCode !: string
    code !: string
    missionID !: string
    libelleFr !: string
    libelleUs !: string
    libelleObjectif !: string
    libelleFacteurCle !: string
    indicateurCategorieID !: string
    responsable !: string
    responsableAutre !: string
    unite !: string
    modeCalcul !: string
    periodicite !: string
    periodeDeclancheur !: Date
    jourRappel !: Date
    periodiciteType !: string
    reference !: number
    referenceAnnee !: string
    dernierResultatConnu !: number
    dernierResultatConnuAnnee !: string
    dernierResultatConnuMois !: string
    cible !: number
    cibleAnnee !: string
    previsions1 !: number
    previsions2 !: number
    previsions3 !: number
    previsionsAnnee1 !: string
    previsionsAnnee2 !: string
    previsionsAnnee3 !: string
    natureDonnees !: string
    sourceDonnees !: string
    sourceDonneesurl !: string
    modeCollecte !: string
    responsableCollecte !: string;
    responsableVerification !: string;
    responsableSynthese !: string;
    validationDonnees !: string;
    coutCollecte !: number;
    limiteBiais !: string;
    interpretation !: string;
    sens !: number;
    etat !: number;
    rouge !: number;
    orange !: number;
    vert !: number;
    actif !: number;
    dateFin !: Date;
    objectifID!: string;
    color!: string
    valeurPrecedente!: number;
    dcrID !: number;
    domaineCle !: string;
    poids !: number;

    mois !: number;
    valide !: number;
    observation !: string;
    validation !: string;

    janvier!: number;
    fevrier!: number;
    mars!: number;
    avril!: number;
    mai!: number;
    juin!: number;
    juillet!: number;
    aout!: number;
    septembre!: number;
    octobre!: number;
    novembre!: number;
    decembre!: number;

    operation!: string;
    expression!: string;
    sousIndicateurs: IndicateurVar[] = [];

    sousIndicateur1!: string;
    sousIndicateur2!: string;
    sousIndicateur1Val!: number;
    sousIndicateur2Val!: number;
    sousIndicateurResultat!: number;
    janvier1!: number;
    fevrier1!: number;
    mars1!: number;
    avril1!: number;
    mai1!: number;
    juin1!: number;
    juillet1!: number;
    aout1!: number;
    septembre1!: number;
    octobre1!: number;
    novembre1!: number;
    decembre1!: number;
    janvier2!: number;
    fevrier2!: number;
    mars2!: number;
    avril2!: number;
    mai2!: number;
    juin2!: number;
    juillet2!: number;
    aout2!: number;
    septembre2!: number;
    octobre2!: number;
    novembre2!: number;
    decembre2!: number;




    cibleT1!: number;
    cibleT2!: number;
    cibleT3!: number;
    cibleT4!: number;

    operationT!: string;

    resultatT1!: number;
    resultatT2!: number;
    resultatT3!: number;
    resultatT4!: number;

    affichageRealisation!: number;
}