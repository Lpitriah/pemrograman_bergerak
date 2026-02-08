import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

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
    IonButtons,
    IonButton,
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
