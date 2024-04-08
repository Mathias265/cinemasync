<template>
    <ion-page>
      
          <main>
         <div class="loading">
           <div class="loading-state" v-if="!isLoading"></div>
         </div>
       </main>
       <div class="container">
          <div class="cards">
             <div class="cards-info" v-for="movie in movieList" :key="movie.id">
  <img :src="getShowPosterUrl(movie.poster_path)" alt="" loading="lazy">
  <h1>{{ movie.title }}</h1>
  <h2>{{ movie.vote_average }}</h2>
             </div>
          </div>
       </div>
      </ion-page>
   
  </template>
  
  <script setup >
  import { IonPage,IonContent,IonCard } from '@ionic/vue';
  import { ref , onMounted} from "vue";
  const isLoading = ref();
  const movieList = ref([]);
  const apiKey = "42c02c3b21245125dc80dc5f81f76917";
  const options = {
   method: "GET",
   headers: {
     accept: "application/json",
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmMwMmMzYjIxMjQ1MTI1ZGM4MGRjNWY4MWY3NjkxNyIsInN1YiI6IjY1YmE5NzdkMzBmNzljMDE4M2FjNjkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sTl1YONLh9hBXGMqd1XfeWEKnPYnxrVb6pDxM03ivmg'
   },
  };
  //eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmMwMmMzYjIxMjQ1MTI1ZGM4MGRjNWY4MWY3NjkxNyIsInN1YiI6IjY1YmE5NzdkMzBmNzljMDE4M2FjNjkyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sTl1YONLh9hBXGMqd1XfeWEKnPYnxrVb6pDxM03ivmg
  const fetchTrendingMovies = async () => {
   try {
     const response = await fetch(
        'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1',
       options
     );
     const data = await response.json();
     movieList.value = data.results;
     isLoading.value = true;
     console.log(movieList.value);
   } catch (error) {
     console.error(error);
   }
  };
  const getShowPosterUrl = (posterPath) => {
    const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';
  
   return posterPath ? `${baseImageUrl}${posterPath}` : '';
  };
  
  onMounted(fetchTrendingMovies);
  </script>
  <style lang="scss" scoped>.container{
    width: 100%;
    ::-webkit-scrollbar {
      width: 1px;
      /* Width of the scrollbar */
    }
    .cards{
       margin-top: 3rem;
     display: grid;
     grid-auto-flow: column;
     scroll-behavior: auto;
     gap: 1rem;
     overflow-y: auto;
     overscroll-behavior-x: contain;
     scroll-snap-type: x mandatory;
     scrollbar-width: none;
    }
    .cards-info{
       scroll-snap-align: start;
       width: 12rem;
        border: 1px solid transparent;
        border-radius: 12px;
     
       h1{
        color: #fff;
           font-size: 1.2rem;
           font-weight: 300;
       }
       img{
          width: 100%;
          border-radius: 12px;
       }
    }
    h2{
      color: #fff;
      font-size: 1.2rem;
      font-weight: 200;
    }
  }
  </style>
  