<template>
  <ion-page>
    <ion-content>
      <main>
        <form @submit.prevent="login">
           
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
             <span v-if="!isLoading">Login</span>
             <div class="spinner" v-if="isLoading"></div>
           </ion-button>

           </div>
       </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonPage,IonContent,IonButton,IonInput} from '@ionic/vue'
import {ref} from 'vue';
import {supabase} from "../clients/supabase";
import {useRouter} from "vue-router";
let email = ref("");
let password = ref("");
const isLoading = ref(false);
const router = useRouter();
async function login(){
  isLoading.value = true;
  //we define our login fo our supabase for login-in
  const {data,error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  //we pass the error condition if our input for login is not filled or has an error
  if(error){
    //we define our toast for the error message
  
    console.log(error)
    router.push('/Error');
  }
  //we pass the else condition if our input for login is filled
  else{
    //we define our toast for the success message
   
    console.log(data)
    //if the pur login info was successfull we will be directed to the dashbord profile
    router.push('/');
    
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
main{
  display: flex;
  justify-content: center;
  align-items: center;
}
form{
  padding: 2rem;
}
div{
  margin-bottom: 1.3rem;
}
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