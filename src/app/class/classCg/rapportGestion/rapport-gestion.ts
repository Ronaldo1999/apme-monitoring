export class RapportGestion {
    rapportID!: string;
    code!: string;
    organisationID!: string;
    activiteID!: string;
    millesime!: string;
    version!: number;

    description!: string;
    periode!: string;

    titre!: string;
    responsable!: string;
    presentation!: string;
    objectif!: string;
    strategie!: string;


    situationAnterieure!: string
    situationTresorerie!: string
    situationEmplois!: string
    etatUtilisation!: string
    performaceGlobale!: string
    resultatsCommerciaux!: string
    activitesRecherche!: string
    actionsRealisees!: string
    pointRH!: string
    perspectives!: string
    revueAnalytique!: string
    perspectivesSuivantes!: string
    budgetID!: string
    
    chargePrevision!: number
    chargeImputation!: number
    chargeSolde!: number
    chargeTaux!: number

    dateGenere!: string;
    user_update!: string;
    last_update!: string;
}
