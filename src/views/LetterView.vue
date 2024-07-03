<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import lettersJSON from '../data/loveNotes.json'

const route = useRoute()
const router = useRouter()
const selectedLetter = ref('')
const letters = ref(lettersJSON)
const letter = ref(route.params.letter)
const notToBlur = ref(null)

const years = ref(0)
const months = ref(0)
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const selectLetter = (event) => {
  selectedLetter.value = event.target.innerText.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")

  router.push({ name: 'letter', params: { letter: selectedLetter.value } })
}

const getWords = (letter) => {
  return letters[letter].note.split(' ')
}

onMounted(() => {
  const start = new Date('2021-01-01T00:00:00');

setInterval(() => {
  const date = new Date();
  
  // Calculate the total difference in milliseconds
  let diff = date - start;
  
  // Create a new date starting from the base date and add the difference to it
  let current = new Date(start.getTime() + diff);
  
  // Calculate the time components
  let calcYears = current.getFullYear() - start.getFullYear();
  let calcMonths = current.getMonth() - start.getMonth();
  let calcDays = current.getDate() - start.getDate();
  let calcHours = current.getHours() - start.getHours();
  let calcMinutes = current.getMinutes() - start.getMinutes();
  let calcSeconds = current.getSeconds() - start.getSeconds();

  // Adjust for negative values
  if (calcSeconds < 0) {
    calcSeconds += 60;
    calcMinutes -= 1;
  }
  if (calcMinutes < 0) {
    calcMinutes += 60;
    calcHours -= 1;
  }
  if (calcHours < 0) {
    calcHours += 24;
    calcDays -= 1;
  }
  if (calcDays < 0) {
    let previousMonth = new Date(current.getFullYear(), current.getMonth(), 0);
    calcDays += previousMonth.getDate();
    calcMonths -= 1;
  }
  if (calcMonths < 0) {
    calcMonths += 12;
    calcYears -= 1;
  }

  years.value = calcYears;
  months.value = calcMonths;
  days.value = calcDays;
  hours.value = calcHours;
  minutes.value = calcMinutes;
  seconds.value = calcSeconds;
}, 1000);
})
</script>

<template>
  <main :style="`background-color: ${letters[letter].secondary_color}`">
    <div class="return" @click="$router.push('/')">
        <mdicon :width="30" name="keyboard-return" />
    </div>
    <div class="noteContainer" :style="`background-color: ${letters[letter].primary_color}`">
      <h1>{{ $route.params.letter }}</h1>
      <div class="messageContainer">
        <div class="message">
          <div v-for="character, index in letters[letter].note">
            <p
              v-if="character != ' '"
              :class="index != notToBlur && notToBlur !== null? 'messageLetter blur' : 'messageLetter'"
              @mouseenter="notToBlur = index"
              @mouseleave="notToBlur = null"
              @click="selectLetter"
            >
              {{ character }}
            </p>
            <p v-else>&nbsp;</p>
          </div>
          <p v-if="letter == 'A'">
            {{ Math.floor(years) }} anos, {{ Math.floor(months) }} meses, {{ Math.floor(days) }} dias, {{ Math.floor(hours) }} horas, {{ Math.floor(minutes) }} minutos e {{ Math.floor(seconds) }} segundos.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.return {
    position: absolute;
    top: 1em;
    left: 1em;
    cursor: pointer;
}

.message {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.blur {
    color: transparent;
    text-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.messageLetter:hover {
  cursor: pointer;
  scale: 1.5;
}

.noteContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 1em;
  border-radius: 5px;
  height: 50vh;
  box-shadow: 5px 2px 4px rgba(0, 0, 0, 0.3);
}

.messageContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
