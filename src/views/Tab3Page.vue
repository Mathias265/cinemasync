<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bookmarked Movies</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-list color="dark">
        <ion-item v-for="movie in bookmarkedMovies" :key="movie.id" color="dark">
          <ion-thumbnail slot="start">
            <ion-img :src="getImageUrl(movie.poster_path)" alt="Movie Poster"></ion-img>
          </ion-thumbnail>
          <ion-label>
            <h2>{{ movie.title }}</h2>
            <p>{{ movie.overview }}</p>
          </ion-label>
          <ion-button @click="deleteBookmark(movie.id)" slot="end" color="danger">
            Delete
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonButton, IonAlert } from '@ionic/vue';

const router = useRouter();
const bookmarkedMovies = ref([]);

const Api_key = '42c02c3b21245125dc80dc5f81f76917'; // Replace 'your_api_key_here' with your actual API key

onMounted(() => {
  loadBookmarkedMovies();
});

const loadBookmarkedMovies = () => {
  const bookmarkedMovieIds = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
  const movies = []; // Initialize empty array to hold fetched movies

  // If there are no bookmarked movie IDs, return early
  if (bookmarkedMovieIds.length === 0) {
    bookmarkedMovies.value = [];
    console.log("no movies");
    return;
   
  }

  // Fetch details for each bookmarked movie
  bookmarkedMovieIds.forEach(async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${Api_key}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      movies.push(data);
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
    }
  });

  // After fetching details for all bookmarked movies, update the ref
  bookmarkedMovies.value = movies;
};

const deleteBookmark = (movieId) => {
  const confirmed = window.confirm('Are you sure you want to delete this bookmark?');
  if (confirmed) {
    // Remove movieId from bookmarkedMovies array
    const index = bookmarkedMovies.value.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
      bookmarkedMovies.value.splice(index, 1);
      // Update local storage
      localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies.value.map(movie => movie.id)));
    }
  }
};

const getImageUrl = (path) => {
  if (!path) {
    return 'https://example.com/default-image.jpg';
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};
</script>





