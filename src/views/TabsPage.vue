<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon  :icon="homeOutline" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="searchOutline"></ion-icon>
          <ion-label>Search</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="heartOutline" />
          <ion-label>Favourite</ion-label>
        </ion-tab-button>


        <ion-tab-button tab="tab4" href="/tabs/tab4" >
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup >
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { searchOutline, heartOutline, homeOutline,personOutline } from 'ionicons/icons';
</script>
<style scoped lang="scss">
ion-tab-bar{
 
  --background:rgb(31, 30, 29); 
  
  border-top: 3px solid #ffc409;
  border-radius: 12px;
}
ion-tab-button{
  background: linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
color: rgb(121, 119, 119);
&:hover,:focus{
    color: #ffc409;
    box-shadow: 0,1px,12px rgba(0,0,0,0.25);
  }
}
ion-page{
  --background:rgb(31,30,29);
}
</style>
