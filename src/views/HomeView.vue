<script setup>
import Letters from '../components/Letters.vue'
</script>

<template>
  <main>
    <Letters />
    <div class="imgs">
      <img src="../../public/images/love-potion.gif" alt="">
      <img src="../../public/images/ily.png" alt="">
    </div>
  </main>
</template>

<style scoped>
.imgs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
} 
img {
  width: 50%;
  margin: 0 auto;
  display: block;
}

@media screen and (min-width: 600px) {
  img {
    width: 30%;
  }
}

@media screen and (min-width: 900px) {
  img {
    width: 20%;
  }
}
</style>
