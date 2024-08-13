import { Groupe } from "../groupe/groupe";
import { Role } from "../role/role";
import { User } from "../user/user";

export class GroupeGlobal {
    
    groupe: Groupe = new Groupe();
    users: User[] = [];
    roles : Role [] = [];
}
