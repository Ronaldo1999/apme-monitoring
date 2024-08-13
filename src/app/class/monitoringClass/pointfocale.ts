import { MoPointFocaleStructure } from "./pointfocalestructure";

export class MoPointFocale {
    moPointFocaleID!: string;
    designationFr!: string;
    designationUs!: string;
    userID!: string;
    organisationID!: string;
    millesime!: string;
    description!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    created_at!: string;
    created_by!: string;
    pointFocaleStructures: MoPointFocaleStructure[] = [];
}