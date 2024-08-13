import { User } from "../user/user"

export class Notificateur {

    objet !:string
    emetteur !:string
    message !:string
    attributs !:string
    destinataires :User[] = []


    whatsapp= true
    sms= true
    email= true



}
