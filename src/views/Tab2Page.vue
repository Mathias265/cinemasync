<!-- src/views/Home.vue -->
<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="ion-padding">Search for your Favourite Movie </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-searchbar
      color="dark"
        v-model="searchQuery"
        @ionInput="performSearch"
      ></ion-searchbar>

      <ion-list color="dark">
        <ion-item color="dark"
          v-for="movie in movies"
          :key="movie.id"
          @click="goToMovieDetails(movie.id)"
        >
          <ion-thumbnail slot="start">
            <ion-img
              :src="getImageUrl(movie.poster_path)"
              alt="Movie Poster"
            ></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.overview }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonList,
  IonItem,
  IonTitle,
  IonThumbnail,
  IonImg,
  IonLabel,
} from "@ionic/vue";
import { useRouter } from "vue-router";
const searchQuery = ref("");
const movies = ref([]);
const router = useRouter();

const searchMovies = async (query) => {
  const API_KEY = "42c02c3b21245125dc80dc5f81f76917";
  const BASE_URL =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("query", query);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    movies.value = data.results;
  } catch (error) {
    console.error("Error fetching data from TMDb:", error);
    // Handle error
  }
};

const performSearch = async () => {
  if (searchQuery.value) {
    await searchMovies(searchQuery.value);
  } else {
    movies.value = [];
  }
};
const getImageUrl = (path) => {
  if (!path) {
    // You can provide a default image or leave it empty
    return "https://example.com/default-image.jpg";
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};
const goToMovieDetails = (id) => {
  router.push({ name: 'MovieDetails', params: { id } });
};
//`/movie/${movieId}`
//movieId
</script>

<style lang="scss" scoped>
ion-searchbar {
  background: rgb(31, 30, 29);
}
ion-list {
  background: rgb(31,30,29);
  h2{
    font-size: 1.2rem;
    color: #fff;
  }
}
ion-item {
  background:black;
  
}
ion-title{
  color: #ffc409;
}
</style>
