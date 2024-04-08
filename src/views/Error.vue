<template>
   <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
          <ion-back-button defaultHref="/Auth" color="warning"></ion-back-button>
          <ion-title>Go back to login page</ion-title>
        </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <main><h3>UNAUTHORISED PAGE BECAUSE YOUR ARE NOT SIGNED IN CORRECTLY</h3><div class="error-loader"></div></main>
    </ion-content>
   </ion-page>
</template>

<script setup>
import {IonBackButton,IonButtons,IonToolbar,IonPage,IonContent,IonHeader,IonTitle} from '@ionic/vue'
</script>

<style lang="scss" scoped>
main{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
}
.error-loader {
    width: 50px;
    height: 50px;
    position: relative;
    animation: rotateError 1s infinite linear;
  }

  .error-loader::before,
  .error-loader::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    animation: errorPulse 1s infinite alternate;
  }

  .error-loader::before {
    top: 20px;
    left: 20px;
  }

  .error-loader::after {
    top: 20px;
    right: 20px;
  }

  @keyframes rotateError {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes errorPulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(2);
    }
  }
  h3{
    color: #fff;
  }
</style>