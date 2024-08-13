import { MoisBudgetaire } from "../moisBudgetaire/mois-budgetaire";

export class AnneeBudgetaire {

    anneeID!:string
    libelleFr!:string
    libelleEn!:string

    mois: MoisBudgetaire[] = [];
}
