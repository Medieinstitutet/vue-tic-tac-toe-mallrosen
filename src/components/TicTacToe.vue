<script setup lang="ts">
import GameBoard from './GameBoard.vue';
import { Player } from './models/Player';

defineEmits<{
    (e: 'newGame'):void
    (e: 'togglePlayer'):void
    (e: 'move', i:number):void
}>()

interface TicTacToeProps{
    playerX:boolean
    currentPlayer: Player[]
    board: string[]
}

defineProps<TicTacToeProps>();


</script>

<template>
    <GameBoard :board="board" :player-x="playerX" :current-player="currentPlayer" @move="(i)=>$emit('move', i)" @toggle-player="()=>$emit('togglePlayer')" @new-game="()=> $emit('newGame')"/>
</template>

<style scoped>

</style>