<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Hitung Luas Persegi</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="text-center">
            Aplikasi Luas Persegi
          </ion-card-title>
          <ion-card-subtitle class="text-center">
            Masukkan nilai sisi untuk menghitung luas
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-item>
            <ion-input
              label="Panjang Sisi"
              label-placement="floating"
              type="number"
              v-model="sisi">
            </ion-input>
          </ion-item>

          <ion-button
            expand="block"
            color="success"
            class="ion-margin-top"
            @click="hitungLuas">
            Hitung Luas Persegi
          </ion-button>

          <div v-if="luas !== null" class="hasil">
            <p>Hasil Perhitungan</p>
            <h1>{{ luas }}</h1>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/vue';

import { ref } from 'vue';

const sisi = ref<number | null>(null);
const luas = ref<number | null>(null);

const hitungLuas = () => {
  if (sisi.value !== null) {
    luas.value = sisi.value * sisi.value;
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.hasil {
  margin-top: 25px;
  padding: 15px;
  border-radius: 12px;
  background: #e8f5e9;
  text-align: center;
}

.hasil p {
  margin: 0;
  font-size: 14px;
  color: #2e7d32;
}

.hasil h1 {
  margin: 5px 0 0;
  font-size: 40px;
  font-weight: bold;
  color: #2dd36f;
}
</style>
