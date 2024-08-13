import { DialogueAction } from "../DialogueAction/dialogue-action"

export class DialogueGestion {

    dialogueID!:string 
    organisationID!: string
    millesime !: string

    role!:string
    dialogueStrategique!:string
    dialogueProgramme!:string
    calendrier:DialogueAction[] = []

}
