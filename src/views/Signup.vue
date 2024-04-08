<template>
   <ion-page>
    <ion-content class="ion-padding">
<main>
    <section>
        <form @submit.prevent="submitToggle">
            <div>
                <ion-input label="First Name" label-placement="floating" fill="solid" placeholder="Enter text"  color="warning" v-model="name" name="name"></ion-input>
            </div>
            <div>
                <ion-input label="Last Name" label-placement="floating" fill="solid" placeholder="Enter text"  color="warning" v-model="last" name="last"></ion-input>
            </div>
            <div>
                <ion-input label="Email Address" label-placement="floating" fill="solid" placeholder="Enter text"  color="warning" v-model="email" name="email"></ion-input>
            </div>
            <div>
                <ion-input type="password" label="Password"  fill="solid"  color="warning" v-model="password" name="password">
    <ion-input-password-toggle slot="end"></ion-input-password-toggle>
  </ion-input>
            </div>
            <div>
              <ion-button expand="full" color="warning" type="submit" :class="{ 'loading': isLoading }">
              <span v-if="!isLoading">Sign-Up</span>
              <!--<span v-else>Loading...</span>-->
              <div class="spinner" v-if="isLoading"></div>
            </ion-button>

            </div>
        </form>
    </section>
</main>

    </ion-content>
   </ion-page>
</template>

<script setup>
import {ref} from 'vue';

import {IonPage,IonContent,IonButton,IonInput} from '@ionic/vue';
import { supabase } from "../clients/supabase";
const name = ref("");
const last = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);

async function submitToggle(){
  isLoading.value = true;
  const {data,error} = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options:{
      data:{
        first_name:name.value,
        last_name:last.value
      }
    }
  })
  if(error){
    console.log(error)
  }
  else{
    console.log(data)
  }
  isLoading.value = false;
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
button{
    width: 100%;
    padding: 5px 0;
}
main{
    display: flex;
    justify-content: center;
}
form{
 
    padding: 2rem;
}
ion-iput{
    border: none;

}
div{
  margin-bottom: 1.3rem;
}
</style>