<script setup lang="ts">
import { ref } from 'vue';
import { Player } from './models/Player';
import { log } from 'console';


const PlayerNameX = "Spelare X :"
const PlayerNameO = "Spelare O :"

const playerInputX = ref("")
const PlayerInputO = ref("")
const error = ref("")


const emit = defineEmits<{
    (e: "addPlayer", text: string):void
}>()

const handleSubmit = () =>{
    if(playerInputX.value && PlayerInputO.value !== ''){
        emit('addPlayer', playerInputX.value)
        emit('addPlayer', PlayerInputO.value)
        playerInputX.value = "";
        PlayerInputO.value = "";
    }else{
        error.value = "Fyll i båda fälten"
    }
}

</script>

<template>
    <div class="playersForm">
        <form @submit.prevent="handleSubmit">
            <p>{{ PlayerNameX }}</p>
            <input type="text" v-model="playerInputX">
            <p>{{ PlayerNameO }}</p>
            <input type="text" v-model="PlayerInputO">
            <button>Spara</button>
            <p> {{ error }}</p>
        </form>
    </div>
</template>

<style scoped>

</style>