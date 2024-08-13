import { BaseEntity } from "./base-entity.model";

export class MoIndicateur extends BaseEntity {
    moIndicateurID!: string;
    moObjectifID!: string;
    code!: string;
    libelleFr!: string;
    description!: string;
    periodicite!: string;
    jourRappel!: string;
    periodiciteType!: string;
    reference!: string;
    cible!: number;
    etat!: string;
  

}