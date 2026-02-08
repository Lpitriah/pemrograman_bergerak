<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Cuaca Cirebon (Live)</ion-title>
      </ion-toolbar>

      <!-- LANGKAH 5A: Segment Button -->
      <ion-toolbar color="primary">
        <ion-segment v-model="selectedView">
          <ion-segment-button value="list">List</ion-segment-button>
          <ion-segment-button value="grid">Grid</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <!-- LANGKAH 5B: Loading -->
      <div v-if="loading" class="ion-text-center ion-padding">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Mengunduh data satelit...</p>
      </div>

      <!-- LANGKAH 5C: Data Cuaca -->
      <div v-else>

        <!-- Tampilan List -->
        <div v-if="selectedView === 'list'">
          <ion-list>
            <ion-item
              v-for="(item, index) in weatherList"
              :key="index"
            >
              <ion-label>
                <h2>{{ formatWaktu(item.waktu) }}</h2>
                <p>Suhu Udara</p>
              </ion-label>
              <ion-badge slot="end" color="warning">
                {{ item.suhu }}°C
              </ion-badge>
            </ion-item>
          </ion-list>
        </div>

        <!-- Tampilan Grid -->
        <div v-if="selectedView === 'grid'">
          <ion-grid>
            <ion-row>
              <ion-col
                size="6"
                v-for="(item, index) in weatherList"
                :key="index"
              >
                <div class="kartu-cuaca">
                  <h1>{{ item.suhu }}°</h1>
                  <p>{{ formatWaktu(item.waktu) }}</p>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

      </div>
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
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner
} from '@ionic/vue';

import { ref, onMounted } from 'vue';

/* =====================
   LANGKAH 3: STATE
===================== */
const loading = ref(true);
const weatherList = ref<any[]>([]);
const selectedView = ref('list');

/* =====================
   LANGKAH 4: FETCH API
===================== */
const fetchWeather = async () => {
  loading.value = true;

  try {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=-6.732&longitude=108.552&hourly=temperature_2m';

    const response = await fetch(url);
    const data = await response.json();

    const times = data.hourly.time;
    const temps = data.hourly.temperature_2m;

    const tempArray = [];

    for (let i = 0; i < 12; i++) {
      tempArray.push({
        waktu: times[i],
        suhu: temps[i]
      });
    }

    weatherList.value = tempArray;

  } catch (error) {
    alert('Gagal mengambil data cuaca!');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

/* =====================
   LANGKAH 6A: FORMATTER
===================== */
const formatWaktu = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/* =====================
   ON MOUNT
===================== */
onMounted(() => {
  fetchWeather();
});
</script>

<style scoped>
/* LANGKAH 6B: STYLING */

.kartu-cuaca {
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.kartu-cuaca h1 {
  color: #3880ff;
  font-weight: bold;
  font-size: 36px;
}

.kartu-cuaca p {
  margin: 0;
  color: #555;
}
</style>
