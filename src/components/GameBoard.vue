<script setup lang="ts">
import { computed, ref } from 'vue';
import { Player } from './models/Player';



defineEmits<{
    (e: 'newGame'):void
    (e: 'togglePlayer'):void
    (e: 'move', i:number):void
}>()

interface GameBoardProps{
    playerX: boolean
    currentPlayer: Player[]
    board: string[]
}

defineProps<GameBoardProps>();


// const player = ref ('X');
// const board = ref ([
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', '']
// ])



</script>

<template>
    <p v-if="playerX"> Spelare X: {{ currentPlayer[0].name }}</p>
    <p v-else> Spelare O: {{ currentPlayer[1].name }}</p>

  <div @click="$emit('togglePlayer')" class="board"> 
    <div v-for="(square,i) in board" :key="i" class='square' @click="$emit('move', i)">{{ board[i] }}</div>
    </div>
    <button @click="$emit('newGame')">Ny spelomgång</button>
</template>

<style scoped>


.board{
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 320px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

.square{
    width: 100px;
    height: 100px;
    border: 1px solid black;
}

}
</style>