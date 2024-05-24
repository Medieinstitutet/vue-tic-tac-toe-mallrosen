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

if(localStorage.getItem('players')){
  state.value.players = JSON.parse(localStorage.getItem('players') || "")
  state.value.onGame = !state.value.onGame;
  console.log(state.value.players);
}

if(localStorage.getItem('array')){
  state.value.board = JSON.parse(localStorage.getItem('array') || "")
}

if(localStorage.getItem('scoreO')){
  state.value.players[1].score = JSON.parse(localStorage.getItem('scoreO') || "")
}

if(localStorage.getItem('scoreX')){
  state.value.players[0].score = JSON.parse(localStorage.getItem('scoreX') || "")
}

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
    localStorage.setItem("players", JSON.stringify(state.value.players));
    state.value.onGame = !state.value.onGame;
  }
};

const newGame = () => {
  localStorage.clear()
  state.value.winner = false;
  state.value.evenGame = false;
  state.value.players.splice(0, 2);
  state.value.board = ["", "", "", "", "", "", "", "", ""];
  state.value.onGame = !state.value.onGame;
};

const togglePlayers = (i:number) => {
  if (state.value.evenGame || state.value.winner) {
    return;
  }if (state.value.board[i] === "")
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
      if(state.value.playerX === true){
      state.value.players[0].score += 1
      localStorage.setItem("scoreX", JSON.stringify(state.value.players[0].score))
      }
      else{
      state.value.players[1].score += 1
      localStorage.setItem("scoreO", JSON.stringify(state.value.players[1].score))
      }
      return;
    }
  }
}

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
  if ((state.value.board[i] === "")){
    togglePlayers(i)}
  if (state.value.evenGame || state.value.winner) return;

  if ((state.value.playerX) && (state.value.board[i] === "")) {
    state.value.board[i] = "X";
  } else if ((!state.value.playerX) && (state.value.board[i] === "")) {
    state.value.board[i] = "O";
  }
  localStorage.setItem("array", JSON.stringify(state.value.board));
  checkWinner();
  checkEven();
  
};

const emptyGame =()=>{
  state.value.winner = false;
  state.value.evenGame = false;
  state.value.board = ["", "", "", "", "", "", "", "", ""];
}

</script>

<template>
  <GameBoard
    v-if="state.onGame"
    :board="state.board"
    :player-x="state.playerX"
    :current-player="state.players"
    :even-game="state.evenGame"
    :winner="state.winner"
    @move="playerMove"
    @new-game="newGame"
    @toggle-player="togglePlayers"
    @empty-game="emptyGame" />
  <Players v-else @add-player="addPlayer" />
</template>

<style scoped></style>
