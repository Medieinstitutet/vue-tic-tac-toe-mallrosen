export class Player {
    id: number
    constructor(public name:string){
        this.id = Date.now()
    }
}