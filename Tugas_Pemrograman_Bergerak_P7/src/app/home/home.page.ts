import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonItem, IonLabel, IonList,
  IonTitle, IonToolbar, IonButtons, IonButton,
  IonFab, IonFabButton, IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, trash, create } from 'ionicons/icons'; // 🆕 Tambah 'create'

import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonItem, IonLabel,
    IonButtons, IonButton,
    IonFab, IonFabButton, IonIcon
  ],
})
export class HomePage {

  dataMahasiswa: any[] = [];

  constructor(
    private dataService: DataMahasiswaService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ add, trash, create }); // 🆕 Tambahkan icon 'create'
  }

  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.dataMahasiswa = await this.dataService.getData();
    this.cdr.detectChanges();
  }

  async hapus(id: number) {
    const konfirmasi = confirm('Yakin ingin menghapus data ini?');
    if (konfirmasi) {
      await this.dataService.hapusData(id);
      this.loadData();
    }
  }
}