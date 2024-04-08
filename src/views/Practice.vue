
<template>
  <ion-page>
    <ion-header>
      <main>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/"></ion-back-button>
          </ion-buttons>
          <ion-title>{{ movie.title }}</ion-title>
        </ion-toolbar>
      </main>
      
    </ion-header>
    <ion-content class="ion-padding  ion-activatable ripple-parent" :fullscreen="true" >
      <img
        :src="getImageUrl(movie.poster_path)"
        
        alt="Movie Poster"
        loading="lazy"
      >
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.overview }}</p>
      <h3>Release Date: {{ movie.release_date }}</h3>
      <h3>Vote Average: {{ movie.vote_average }}/10</h3>
      <!-- Add more details as needed -->
      <ion-ripple-effect></ion-ripple-effect>
    </ion-content>
    
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  IonRippleEffect,
  IonPage,
  IonContent,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonHeader,
} from "@ionic/vue";

const route = useRoute();
const movieId = ref(route.params.id);
const movie = ref({});
const apiKey = "42c02c3b21245125dc80dc5f81f76917";
// Fetch movie details
async function fetchMovieDetails() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId.value}?api_key=${apiKey}`
  );
  const data = await response.json();
  movie.value = data;
}

onMounted(() => {
  fetchMovieDetails();
});
const getImageUrl = (path) => {
  if (!path) {
    // You can provide a default image or leave it empty
    return "https://example.com/default-image.jpg";
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};
</script>
<style lang="scss" scoped>
main{

  img{
    width: 23rem;
    height: 23rem;
    }
  }
  h2{
  color: #d3cece;
}
p,h3{
  color: #e9e3e3;
}
ion-title{
  color: #ffc409;
}
ion-back-button{
  color: #ffc409;
}
</style>
