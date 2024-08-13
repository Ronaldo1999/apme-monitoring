export class FindParam {
    userID!: string
    organisationID!: string
    libelleOrganisation!: string
    structureID!: string
    indicateurID!: string
    moduleID!: string
    posteTraitementID!: string
    missionID!: string
    budgetID!: string
    dcrID!: number
    strategie!: number
    activiteID!: string
    tacheID!: string
    reference!: string
    millesime!: string
    etat!: number
    periode!: number
    dateMax!: Date
    dateMin!: Date
    objet!: string
    sensibiliteID!: string
    typeCourrierID!: string
    moPlanTravailID!: string
    classeur!: string
    autre!: string
    type!: string


    constructor(_org: string, _login: string) {
        this.userID = _login
        this.organisationID = _org
    }


}
