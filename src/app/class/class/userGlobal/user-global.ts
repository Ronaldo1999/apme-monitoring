import { Organisation } from "../organisation/organisation";
import { Poste } from "../poste/poste";
import { Sensibilite } from "../sensibilite/sensibilite";
import { Structure } from "../structure/structure";
import { User } from "../user/user";

export class UserGlobal {

    user:User = new User();
    sensibilites: Sensibilite[] = []
    postetraitements: Poste[] = []
    organisations: Organisation[] = []
    structures: Structure[] = []
    chaine!:string
    profil!:string
    constructor(_user:User,_sensibilites:Sensibilite[],_postetraitements:Poste[]){
        this.user=_user
        this.sensibilites=_sensibilites
        this.postetraitements=_postetraitements
    }
    
}
