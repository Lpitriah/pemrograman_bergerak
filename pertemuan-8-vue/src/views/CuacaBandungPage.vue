<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Cuaca Bandung (Live)</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- Loading -->
      <div v-if="loading" class="center">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Memuat data cuaca...</p>
      </div>

      <!-- Data Cuaca -->
      <ion-card
        v-for="(item, index) in weatherList"
        :key="index"
      >
        <ion-card-header>
          <ion-card-title>
            {{ formatWaktu(item.waktu) }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <p>
            Suhu:
            <strong>{{ item.suhu }} °C</strong>
          </p>

          <!-- LOGIKA TUGAS -->
          <p v-if="item.dingin" class="dingin">
            ❄️ DINGIN SEKALI
          </p>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner
} from '@ionic/vue';

import { ref, onMounted } from 'vue';

/* =========================
   STATE
========================= */
const weatherList = ref<any[]>([]);
const loading = ref(true);

/* =========================
   FETCH WEATHER BANDUNG
========================= */
const fetchWeather = async () => {
  loading.value = true;

  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=-6.905977&longitude=107.613144&hourly=temperature_2m';

    const response = await fetch(url);
    const data = await response.json();

    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    const tempArray: any[] = [];

    // ✅ 24 JAM + LOGIKA DINGIN
    for (let i = 0; i < 24; i++) {
      tempArray.push({
        waktu: times[i],
        suhu: temps[i],
        dingin: temps[i] < 20   // 🔥 LOGIKA UTAMA TUGAS
      });
    }

    weatherList.value = tempArray;

  } catch (error) {
    alert('Gagal mengambil data cuaca');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

/* =========================
   FORMAT WAKTU
========================= */
const formatWaktu = (waktu: string) => {
  const date = new Date(waktu);
  return date.toLocaleString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  fetchWeather();
});
</script>

<style scoped>
.center {
  text-align: center;
  margin-top: 40px;
}

.dingin {
  color: #0d6efd;
  font-weight: bold;
  margin-top: 8px;
}
</style>
