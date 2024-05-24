export class Player {
    id: number
    score: number
    constructor(public name:string){
        this.id = Date.now()
        this.score = 0
    }
}