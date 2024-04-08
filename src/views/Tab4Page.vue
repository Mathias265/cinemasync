<template>
  <ion-page>
    <ion-header class="Ion-padding">
<ion-toolbar>
  <ion-title>Profile</ion-title>
  <ion-button slot="end" color="warning" type="submit" :class="{ 'loading': isLoading }" @click="logout">
             <span v-if="!isLoading">Log Out</span>
             <div class="spinner" v-if="isLoading"></div>
           </ion-button>

</ion-toolbar>

    </ion-header>
<ion-content>

</ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage, IonHeader,IonContent,IonToolbar,IonTitle,IonButton,IonButtons} from '@ionic/vue'
import { supabase } from "../clients/supabase";
import {ref} from "vue";
const isLoading = ref(false);
const account = ref();
import { useRouter } from "vue-router";
const router = useRouter();
getSession();

async function getSession(){
  account.value = await supabase.auth.getSession();
};
 async function logout(){
  isLoading.value = true;
 const {error} = await supabase.auth.signOut();
 if(error){
  console.log(error);
 }
 else{
  router.push("/Auth");
  console.log("logout was successful");
 }
 isLoading.value = true;
};

</script>

<style lang="scss" scoped>
.spinner {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid #fff;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-left: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>