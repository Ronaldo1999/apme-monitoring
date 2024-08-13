export class CahierCharge {

    cahierChargeID!: string;
    missionID!: number;
    code!: string;
    ip_update!: string;
    organisationID!: string;
    structureID!: string;
    activiteID!: string;
    libelleStructure!: string;
    abbrStructure!: string;
    millesime!: string;
    dateGenere!: string;
    dateDebut!: string;
    dateFin!: string;
    contenu!: string;
    version!: number;
    user_update!: string;
    last_update!: string;
    titre !: string;
    strategieFr!: string;
    missionsFr!: string;
    color!: string;
}

export class Strategi {
    strategiID!: number;
    libelleFr!: string;
    libelleUs!: string;
    color!: string;
}
export class Mission {
    last_update !: Date
    user_update !: string
    ip_update !: string
    libelleFr !: string
    libelleUs !: string
    code !: string
    missionID!: string
    niveauMissionID !: number
    missionParentID!: string
    organisationID!: string
    millesime!: string
    structureID!: string
    activiteID!: string
    referenceDesignation!: string
    numOrdre!: number
    sigle!: string
    libelleParent!: string
    libelleGrandParent!: string
    nbFils!: number
    nbPetitFils!: number
    dcrID!: number
    smart !: string
}

export class Objectif {

}

export class Action {
    actionID!: number;
    libelleFr!: string;
    libelleUs!: string;
}

export class Indicateur {
    indicateurID!: number;
    libelleFr!: string;
    libelleUs!: string;
}