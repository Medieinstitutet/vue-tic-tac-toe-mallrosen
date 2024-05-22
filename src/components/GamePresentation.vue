<script setup lang="ts">
import { ref } from 'vue';
import TicTacToe from './TicTacToe.vue';
import { IGameState } from './models/IGameState';
import { Player } from './models/Player';
import Players from './Players.vue';


const state = ref<IGameState>({
    playerX: true,
    onGame: false,
    players: [],
    board: ['','','','','','','','','']

})


const addPlayer =(name:string)=>{
    state.value.players.push(new Player(name))
    if(state.value.players.length === 2){
    
    state.value.onGame = !state.value.onGame;  
    console.log(state.value.players.length)  
    }
}

const newGame = () =>{
    state.value.players.splice(0, 1)
    state.value.onGame = !state.value.onGame    
}


const togglePlayers = () =>{
    state.value.playerX = !state.value.playerX
}


const playerMove = (i:number) => {
    if(state.value.playerX){
        state.value.board[i] = 'X'
    }else {
        state.value.board[i] = 'O'


    }
}

</script>

<template>
<TicTacToe v-if="state.onGame" :board="state.board" :player-x="state.playerX" :current-player="state.players" @move="playerMove" @new-game="newGame" @toggle-player="togglePlayers"/>
<Players v-else @add-player="addPlayer"/>
</template>

<style scoped>

</style>