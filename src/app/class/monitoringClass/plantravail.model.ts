import { ActiviteARealiser } from "./activitearealiser.model";
import { BaseEntity } from "./base-entity.model";

export class PlanTravail extends BaseEntity{
    moPlanTravailID!: string;
    libelleFr!: string;
    libelleUs!: string;
    structureID!: string;
    mode!: number;
    description!: string;
    moPointFocaleID!: string;

    activiteARealisers: ActiviteARealiser[] = [];
    planstructures: PlanStructure[] = [];
}

export class PlanStructure extends BaseEntity{
    moPlanStructureID!: string;
    moPlanTravailID!: string;
    structureID!: string;
}