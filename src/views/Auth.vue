<template>
  <ion-page>
    <ion-header class="ion-padding ion-no-border">
      <h2>Welcome to cinemasync</h2>
      <ion-segment
        color="warning"
        value="warning"
        v-model="segment"
        @ionChange="segmentChanged"
      >
        <ion-segment-button value="option1"
          ><ion-label>Sign-up</ion-label></ion-segment-button
        >
        <ion-segment-button value="option2"
          ><ion-label>Login</ion-label></ion-segment-button
        >
      </ion-segment>
    </ion-header>
    <ion-content>
      

      <div class="segment" :fullscreen="false">
        <Signin v-if="segment === 'option2'" />
        <Signup v-if="segment === 'option1'" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonSegment, IonSegmentButton } from "@ionic/vue";
import Signin from "./signin.vue";
import Signup from "./signup.vue";
import { ref } from "vue";

const segment = ref("option1");
const segmentChanged = () => {
  localStorage.setItem("segment", segment.value);
};
</script>

<style lang="scss" scoped>
h2{
  color: #ffc409;
}

</style>
