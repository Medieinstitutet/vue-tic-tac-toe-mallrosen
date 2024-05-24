<script setup lang="ts">
import { ref } from "vue";
import { IGameState } from "./models/IGameState";
import { Player } from "./models/Player";
import Players from "./Players.vue";
import GameBoard from "./GameBoard.vue";

const state = ref<IGameState>({
  playerX: true,
  onGame: false,
  players: [],
  board: ["", "", "", "", "", "", "", "", ""],
  winner: false,
  evenGame: false,
});

const winninglinesIndex = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const addPlayer = (name: string) => {
  state.value.players.push(new Player(name));
  if (state.value.players.length === 2) {
    state.value.onGame = !state.value.onGame;
    console.log(state.value.players.length);
  }
};

const newGame = () => {
  state.value.winner = false;
  state.value.evenGame = false;
  state.value.players.splice(0, 1);
  state.value.board = ["", "", "", "", "", "", "", "", ""];
  state.value.onGame = !state.value.onGame;
};

const togglePlayers = () => {
  if (state.value.evenGame || state.value.winner) {
    return;
  }
  state.value.playerX = !state.value.playerX;
};

const checkWinner = () => {
  for (let i = 0; i < winninglinesIndex.length; i++) {
    const [a, b, c] = winninglinesIndex[i];

    if (
      state.value.board[a] === state.value.board[b] &&
      state.value.board[b] === state.value.board[c] &&
      state.value.board[a] !== ""
    ) {
      state.value.winner = true;
      return;
    }
  }
};

const checkEven = () => {
  if (state.value.winner === false) {
    for (let i = 0; i < state.value.board.length; i++) {
      {
        if (state.value.board[i] === "") {
          return;
        }
      }
    }
    state.value.evenGame = true;
  }
};

const playerMove = (i: number) => {
  if (state.value.evenGame || state.value.winner) return;
  if (state.value.playerX) {
    state.value.board[i] = "X";
  } else {
    state.value.board[i] = "O";
  }
  checkWinner();
  checkEven();
};
</script>

<template>
  <h1 v-if="state.winner">Vinst</h1>

  <h1 v-if="state.evenGame">Oavgjort</h1>

  <GameBoard
    v-if="state.onGame"
    :board="state.board"
    :player-x="state.playerX"
    :current-player="state.players"
    @move="playerMove"
    @new-game="newGame"
    @toggle-player="togglePlayers" />
  <Players v-else @add-player="addPlayer" />
</template>

<style scoped></style>
