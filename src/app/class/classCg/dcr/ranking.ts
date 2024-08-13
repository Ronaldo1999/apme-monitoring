import { GrilleEvaluation } from "../grilleEvaluation/grille-evaluation"
import { Indicateur } from "../indicateur/indicateur"

export class Ranking {

    dcrID!: number;
    rankingID!: string;
    grilleID!: string;

    activiteID!: string
    indicateurID!: string
    organisationID!: string
    structureID!: string
    libelleStructure!: string
    millesime!: string
    libelleFr!: string
    libelleUs!: string
    reference!: number
    cible!: number
    dernierResultatConnu!: number;
    valeurPrecedente!: number;
    sousIndicateur1Val!: number;
    sousIndicateur2Val!: number;
    sousIndicateurResultat!: number;
    taux!: number;
    poids!: number;

    critere!: number;
    libelleCritere!: string;
    titre!: string;
    rang!:number;
    mois!: string;
    moyenne !: number;
    moyennePrecedente !: number;
    scorePondere !: number;
    scoreBase20!: number;

    user_update!: string;
    last_update!: string;
    structures: GrilleEvaluation[] = []

}
