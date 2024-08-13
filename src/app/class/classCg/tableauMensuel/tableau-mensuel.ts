export class TableauMensuel {

    tableauID!: string;
    organisationID!: string;
    millesime !: string;
    version!: number;
    mois !: string;
    dateGenere!: string;
    user_update !: string;
    last_update!: string;
    libelleFr!: string;
    libelleUs!: string;

    activiteID!: string;
    missionID!: string;
    indicateurID!: string;
    libelleActivite!: string;
    libelleObjectif!: string;
    libelleIndicateur!: string;

    code!: string;

    niveauActiviteID!: number;
    activiteParentID!: string;
    structureID!: string;
    structureResponsable!: string;

    reference!: number;
    referenceAnnee !: string;
    dernierResultatConnu!: number;
    dernierResultatConnuAnnee !: string;
    cible!: number;
    cibleAnnee!: string;

    tbmID !:string
    valide !:string
    userValide !:string
    dateValidation !:string
    libelleActiviteFr !:string
    libelleActiviteUs !:string
    agentResponsable !:string
    autreResponsable !:string
    indicateur!: string

titre!:string

}
