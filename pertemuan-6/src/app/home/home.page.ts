import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ],
})
export class HomePage {

  dataMahasiswa = [
    { id: 1, nama: 'Andi Setiawan', prodi: 'TI' },
    { id: 2, nama: 'Siti Aminah', prodi: 'SI' },
    { id: 3, nama: 'Dedi Corbuzier', prodi: 'DKV' },
  ];

}
