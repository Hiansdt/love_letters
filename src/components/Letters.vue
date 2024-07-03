<script setup>
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import lettersJSON from '../data/loveNotes.json'

const router = useRouter()
const letters = ref(lettersJSON)
const letterKeys = ref(Object.keys(lettersJSON))
const selectedLetter = ref('')

const selectLetter = (event) => {
  selectedLetter.value = event.target.innerText
  router.push({ name: 'letter', params: { letter: selectedLetter.value } })
}
</script>

<template>
  <section class="">
    <div class="letterContainer">
      <div
        class="letterKey"
        :style="`background-color: ${letters[key].primary_color};`"
        @click="selectLetter"
        v-for="key in letterKeys"
        :key="key"
      >
        {{ key }}
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.letterContainer {
  display: flex;
  flex-wrap: wrap;
  margin: 5%;
  justify-content: center;
}

.letterKey {
  padding: 1em;
  border: 1px solid #333;
  width: 1em;
  font-size: 1.5em;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: #333;
  margin: 0.5%;
}

.letterKey:hover {
  color: #fff;
  cursor: pointer;
}
</style>
