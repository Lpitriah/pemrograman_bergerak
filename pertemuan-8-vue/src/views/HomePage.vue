<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Aplikasi Vue Pertamaku</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div id="container">
        <h2>Angka saat ini:</h2>
        <h1 class="angka-besar">{{ angka }}</h1>

        <ion-button expand="block" @click="tambah">
          Tambah (+)
        </ion-button>

        <ion-button expand="block" color="danger" @click="kurang">
          Kurang (-)
        </ion-button>

        <ion-button expand="block" fill="outline" @click="reset">
          Reset
        </ion-button>
        <hr />

<ion-item>
  <ion-input
    label="Siapa nama Anda?"
    label-placement="floating"
    v-model="namaUser">
  </ion-input>
</ion-item>

<ion-button
  expand="block"
  color="secondary"
  router-link="/luas-persegi">
  Ke Tugas Luas Persegi
</ion-button>


<p v-if="namaUser">
  Selamat Datang, <strong>{{ namaUser }}</strong>!
</p>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput
} from '@ionic/vue';


import { ref } from 'vue';

// Variabel reaktif
const angka = ref(0);
const namaUser = ref('');

// Fungsi
const tambah = () => {
  angka.value++;
  console.log('Angka ditambah:', angka.value);
};

const kurang = () => {
  if (angka.value > 0) {
    angka.value--;
  }
};

const reset = () => {
  angka.value = 0;
};
</script>

<style scoped>
#container {
  text-align: center;
  margin-top: 30px;
}

.angka-besar {
  font-size: 80px;
  font-weight: bold;
  color: #2dd36f;
  margin: 20px 0;
}
</style>
