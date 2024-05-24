import { Player } from "./Player"

export interface IGameState{
    playerX: boolean
    onGame: boolean
    players: Player[]
    board: string[]
    winner:boolean
    evenGame: boolean
}