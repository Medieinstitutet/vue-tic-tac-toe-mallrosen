<script setup lang="ts">
import { ref } from "vue";

const PlayerNameX = "Spelare X :";
const PlayerNameO = "Spelare O :";

const playerInputX = ref("");
const PlayerInputO = ref("");
const error = ref("");

const emit = defineEmits<{
  (e: "addPlayer", text: string): void;
}>();

const handleSubmit = () => {
  if (playerInputX.value && PlayerInputO.value !== "") {
    emit("addPlayer", playerInputX.value);
    emit("addPlayer", PlayerInputO.value);
    playerInputX.value = "";
    PlayerInputO.value = "";
  } else {
    error.value = "Fyll i båda fälten";
  }
};
</script>

<template>
  <div class="playersForm">
    <form @submit.prevent="handleSubmit">
      <p>{{ PlayerNameX }}</p>
      <input type="text" v-model="playerInputX" />
      <p>{{ PlayerNameO }}</p>
      <input type="text" v-model="PlayerInputO" />
      <button @click="handleSubmit">Spela</button>
      <p>{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  input {
    min-height: 30px;
    font-size: 20px;
  }
  p {
    font-size: 20px;
  }
  button {
    margin-top: 20px;
    display: block;
  }
}
</style>
