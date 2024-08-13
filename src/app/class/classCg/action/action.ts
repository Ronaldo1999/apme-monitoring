export class Action {
    action!:string
    acteur!:string
    email!: string
    description!:string
    text_color: any = {
        r: 0, g: 0, b: 0
    };
    font_color: any = {
        r: 185, g: 225, b: 228
    };
    dateCloture!:Date
    dateFin!:Date
    dateDebut!: Date
}
