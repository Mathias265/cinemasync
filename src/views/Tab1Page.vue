<template>
  <ion-page>
    <ion-header class="ion-padding" :translucent="true">
      <section>
        <main>
        
          <ion-buttons slot="start">
            <section>
           <h5>{{ greeting }} USER</h5>
            </section>
          </ion-buttons>
        </main>

        <main>
          <ion-buttons>
            <ion-button>
              <ion-icon
                slot="end"
                :Icon="personOutline"
                size="large"
                color="warning"
              ></ion-icon>
            </ion-button>
          </ion-buttons>
        </main>
      </section>

      <div>
        <ion-segment
          value="defualt"
          color="warning"
          v-model="segment"
          @ionChange="segmentChanged"
        >
          <ion-segment-button value="option1">
            <ion-label>Trending</ion-label>
          </ion-segment-button>
          <ion-segment-button value="option2">
            <ion-label>Top rated</ion-label>
          </ion-segment-button>
          <ion-segment-button value="option3">
            <ion-label>Upcoming</ion-label>
          </ion-segment-button>
          <ion-segment-button value="option4">
            <ion-label>Popular</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>
    </ion-header>

    <ion-content :fullscreen="false">
      <ion-refresher
        slot="fixed"
        @ionRefresh="handleRefresh($event)"
        :pull-factor="0.5"
        :pull-min="100"
        :pull-max="100"
      >
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div class="segment" :fullscreen="false">
        <moviesTrending v-if="segment === 'option1'" />
        <moviesNew v-if="segment === 'option2'" />
        <moviesPremieres v-if="segment === 'option3'" />
        <moviesPopular v-if="segment === 'option4'" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../clients/supabase";
import Airing from "../components/Airing.vue";
import moviesTrending from "../components/moviesTrending.vue";
import moviesPremieres from "../components/moviesPremieres.vue";
import moviesPopular from "../components/moviesPopular.vue";
import moviesNew from "../components/moviesNew.vue";
import {
  IonPage,
  IonInput,
  IonRefresher,
  IonRefresherContent,
  IonHeader,
  IonContent,
  IonButtons,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";
import { personOutline } from "ionicons/icons";
const account = ref();

getSession();

async function getSession(){
  account.value = await supabase.auth.getSession();
};

const segment = ref("option1");
const segmentChanged = () => {
  localStorage.setItem("segment", segment.value);
};

const handleRefresh = (event) => {
  event.target.complete();
};

const currentDate = ref(new Date());
//we trigger a function to run the command
const getGreeting =()=>{
    const hour = currentDate.value.getHours();
    //if the condition changes
    if(hour >= 5 && hour < 12){
        return"GOOD MORNING";
    }
    else if(hour >=12 && hour <18){
        return "GOOD AFTERNOON";
    }
    else{
        return"GOOD EVENING";
    }
};
const greeting = getGreeting();


</script>
<style scoped lang="scss">
ion-card {
  margin-top: 20rem;
  min-height: 20vh;
}
ion-header {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(1000px);
  top: 0;
  color: rgb(121, 119, 119);
}
.segment {
}
ion-label {
  font-size: 12px;
}
ion-segment {
  margin-top: 1rem;
}
.search {
  display: flex;
  justify-content: center;
  padding: 0 0 2rem 0;
  align-items: center;
  ion-searchbar {
    width: 21rem;
    outline: none;
    border: none;
    --background: rgb(92, 90, 89);
    color: #fff;

    border-radius: 12rem;

    ion-icon {
      font-size: 30px;
      cursor: pointer;
    }
  }
}
ion-content {
  --background: rgb(31, 30, 29);
  margin-bottom: 20vh;
}
section {
  display: flex;
  justify-content: space-between;
}
ion-label {
  color: #fff;
  font-size: 11px;
}
ion-searchbar {
  position: sticky;
  top: 2rem;
}
h2,h5 {
  color: #fff;
}
</style>
