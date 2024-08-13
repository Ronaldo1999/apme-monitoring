import { ContratObjectifDetail } from "./contrat-objectif-detail";

export class ContratObjectif {
    contratObjectifID!: string;

    organisationID!: string;
    structureID!: string;
    libelleStructure!: string;
    millesime!: string;

    code!: string;
    timbre!: string;
    responsable!: string;
    responsableMat!: string;
    poste!: string;
    dateGenere!: string;
    version!: number;

    user_update!: string; last_update!: string

    details: ContratObjectifDetail[] = []
}
