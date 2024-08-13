import { Structure } from "src/app/class/structure/structure";
import { Indicateur } from "../indicateur/indicateur";

export class NoteAnalyse {

    noteAnalyseID!: string;
    noteSyntheseID!: string;
    code!: string;
    timbre!: string;
    organisationID!: string;
    structureID!: string;
    libelleStructure!: string;
    millesime!: string;

    version!: number;
    dateGenere!: string;
    user_update!: string;
    last_update!: string;
    id!: string;
    domaineCle!: string;
    description!: string;
    titre!: string;
    periode!: number;
    entete!: string;
    pied!: string;
    dcrID!: number;
    moyenne!: number;
    moyennePondere!: number;
    scorePondere!: number;
    scoreBase20!: number;
    reference!: number;
    cible!: number;
    taux!: number;
    poids!: number;
    bu!: number;
    indicateurs: Indicateur[] = [];
    structures: string[] = []
}
