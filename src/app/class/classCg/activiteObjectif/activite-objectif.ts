import { Indicateur } from "../indicateur/indicateur"
import { Mission } from "../mission/mission";

export class ActiviteObjectif {

    objectif: Mission = new Mission();
    indicateurs: Indicateur[] = []

}