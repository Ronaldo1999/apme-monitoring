import { ModeContractualisation } from "src/app/enum/mode-contractualisation.enum";
import { MoOperation } from "./operation.model";
import { MoIndicateur } from "./indicateur.model";
import { BaseEntity } from "./base-entity.model";
import { MoMemoireDepense } from "./memoire-depense.model";

export class ActiviteARealiser {
    moniActiviteARealiserID!: string;
    moPlanTravailID!: string;
    structureID!: string;
    spID!: string;
    actionID!: string;
    activiteID!: string;
    tacheID!: string;
    dateDebut!: string;
    dateFin!: string;
    raciID!: string;
    modeContractualisation!: ModeContractualisation;
    reference!: number;
    cible!: number;
    poids!: number;
    taux!: number;
    echeance!: string;
    cout!: number;
    statut!: string;
    offline!: string;
    frequence!: string;
    libelleFr!: string;
    libelleUs!: string;
    organisationID!: string;
    millesime!: string;
    objectif!: string;
    indicateur!: string;
    description!: string;
    last_update!: string;
    user_update!: string;
    ip_update!: string;
    created_at!: string;
    created_by!: string;
    color!: string;
    visibilte!: string;
    typer!: number;
    typea!: number;
    typec!: number;
    typei!: number;
    montant!: number;
    r!: string;
    a!: string;
    c!: string;
    i!: string;

    operations: MoOperation[] = [];
    objectifs: MoActiviteObjectif[] = [];
    indicateurs: MoIndicateur[] = [];
    memoiredepenses: MoMemoireDepense[] = [];

}

export class MoActiviteObjectif extends BaseEntity{
    moObjectifID!: string;
    moniActiviteARealiserID!: string;
    libelleFr!: string;
    code!: string;
    libelleUs!: string;
    description!: string;

    indicateurs: MoIndicateur[] = [];
}
