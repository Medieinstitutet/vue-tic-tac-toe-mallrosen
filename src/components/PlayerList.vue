<script setup lang="ts">
import { ref } from 'vue';
import Players from './Players.vue';
import { Player } from './models/Player';
const playerList = ref<Player[]>([])

const addPlayer =(name:string)=>{
    playerList.value.push(new Player(name))
    console.log(playerList.value);    
}

</script>

<template>
    <Players @add-player="addPlayer"/>
</template>

<style scoped>

</style>