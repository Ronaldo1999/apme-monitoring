import { PlanActionDetail } from "./plan-action-detail";

export class PlanAction {
    planActionID!: string;

    organisationID!: string;
    structureID!: string;
    libelleStructure!: string;
    millesime!: string;
    titreFr!: string;
    titreUs!: string;

    user_update!: string; last_update!: string

    details: PlanActionDetail[] = []
}
