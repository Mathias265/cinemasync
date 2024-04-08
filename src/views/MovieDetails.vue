<style lang="scss" scoped>
ion-back-button{
  color: #ffc409;
}
h2{
  font-size:2rem;
}
ion-title{
  color: #ffc409;
}
img{
  width: 100;
  height: auto;
}
  .review{
   // background: rgb(66, 66, 66);
    color: #fff;
    padding: 2rem;
    border-radius: 12px 12px 0 0;
  }
  ion-icon{
    font-size: 2rem;
    cursor: pointer;
  }
</style>
<!-- src/views/MovieDetails.vue -->

<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ movie.title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      
      <img :src="getImageUrl(movie.poster_path)" alt="Movie Poster" loading="lazy">
    
      <div class="review">
       
        <div>
          <ion-button @click="toggleBookmark" id="open-toast" color="warning">
            <ion-icon :icon="isBookmarked() ? bookmarkOutline : starOutline" color="light"></ion-icon>
          </ion-button>
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
        <p>Rating: {{ movie.vote_average }}/10</p>
        <button @click="goToBookmarks">go to</button>
      </div>
      </div>
      <ion-loading
      :is-visible="loading"
      message="Loading..."
    ></ion-loading>
    <ion-toast
    :is-open="isOpen"
    trigger="open-toast"
    message="Movie Added!"
    :duration="2000"
    :buttons="toastButtons"
    @didDismiss="handleDismiss($event)"
    :icon="trophyOutline"
  ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { bookmarkOutline,starOutline, trophyOutline } from 'ionicons/icons';
import { useRoute,useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonThumbnail,  IonLabel,IonLoading,IonButton,IonToast } from '@ionic/vue';
const loading = ref(false);
const isOpen = ref(false);
const route = useRoute();
const movieId = ref(route.params.id);
const movie = ref({});
const Api_key = '42c02c3b21245125dc80dc5f81f76917';
const router = useRouter();
const bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];
onMounted(async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId.value}?api_key=${Api_key}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();
    movie.value = data;
    movieLoaded.value = true;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
  finally {
    loading.value = true; // Hide loading animation
  }
});

const getImageUrl = (path) => {
  if (!path) {
    // You can provide a default image or leave it empty
    return "https://example.com/default-image.jpg";
  }
  return `https://image.tmdb.org/t/p/w500${path}`;
};

const toggleBookmark = () => {
  const index = bookmarkedMovies.indexOf(movieId.value);
  if (index === -1) {
    // Movie is not bookmarked, so bookmark it
    bookmarkedMovies.push(movieId.value);
    console.log("click worked");
    isOpen = ref(true);
  } else {
    // Movie is bookmarked, so remove it from bookmarks
    bookmarkedMovies.splice(index, 1);
    isOpen.value = true;
  }
  // Update local storage
  localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));
};
const isBookmarked = () => bookmarkedMovies.includes(movieId.value);

const goToBookmarks = () => {
  router.push("/tabs/tab3");
};

</script>

