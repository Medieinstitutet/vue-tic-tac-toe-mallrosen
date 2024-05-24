<script setup lang="ts">
import { Player } from "./models/Player";

defineEmits<{
  (e: "newGame"): void;
  (e: "move", i: number): void;
  (e: "emptyGame"): void;
}>();

interface GameBoardProps {
  playerX: boolean;
  currentPlayer: Player[];
  board: string[];
  winner: boolean;
  evenGame: boolean;
}

defineProps<GameBoardProps>();
</script>

<template>

    <h1 v-if="!playerX && winner">{{ currentPlayer[1].name + " vann!"}}</h1>
    <h1 v-if="playerX && winner">{{ currentPlayer[0].name + " vann!"}}</h1>
    <h1 v-if="evenGame">Oavgjort!</h1>

    <div v-if="!winner && !evenGame">
    <p v-if="!playerX">Spelare X: {{ currentPlayer[0].name }}</p>
    <p v-else>Spelare O: {{ currentPlayer[1].name }}</p>
    </div>
  <div class="board">
    <div
      v-for="(square, i) in board"
      :key="i"
      class="square"
      @click="$emit('move', i)">
      {{ board[i] }}
    </div>
  </div>
  <button @click="$emit('newGame')">Nya spelare</button>
  <button @click="$emit('emptyGame')">Ny spelomgång</button>

  <p>
    {{
      currentPlayer[0].name +
      " : " +
      currentPlayer[0].score +
      "  |  " +
      currentPlayer[1].name +
      " : " +
      currentPlayer[1].score
    }}
  </p>
</template>

<style scoped>
.board {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  border: 2px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .square {
    font-size: 60px;
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
}
button {
  display: flex;
  width: 260px;
  margin: 20px;
  justify-content: center;
}

p {
  font-size: 30px;
}
</style>
