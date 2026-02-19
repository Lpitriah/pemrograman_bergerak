import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard,IonCardHeader, IonCardTitle, IonCardContent, IonImg } from '@ionic/angular/standalone';
import { RandomUserService } from '../services/random-user.service';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.page.html',
  styleUrls: ['./random-user.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard,IonCardHeader, IonCardTitle, IonCardContent, IonImg ]
})
export class RandomUserPage {
  user:any =null;
  isLoading = false ;

  constructor(private randomUserService:RandomUserService) {}
  async generateUser() {
    this.isLoading = true;
    try {
      const response= await
      this.randomUserService.getRandomUser();
      this.user=response.results[0];
    } catch (error) {
      console.error(error);
    }
    this.isLoading=false;
  }


}
