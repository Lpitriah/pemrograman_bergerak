import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel, IonSpinner, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

//import service
import { GeminiService } from '../services/gemini.service';
@Component ({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonItem, IonInput, IonButton, IonIcon, IonList, IonLabel, IonSpinner],
})

export class HomePage {
 userInput ='';
 chatHistory: {role: 'user' | 'model', text:string } [] = [];
 isLoading = false;

 constructor(private geminiService: GeminiService) {
  addIcons ({send});
 }
kirimPesan() {
  if (!this.userInput.trim()) return;
  //untuk menampilkan pesan user dilayar
  const pesanUser =this.userInput;
  this.chatHistory.push ({ role:'user', text:pesanUser });
  this.userInput ='';
  this.isLoading = true;

  //untuk memanggil service AI
  this.geminiService.generateText (pesanUser).subscribe ({
    next: (response: any) => {
      const jawabanAI= response.candidates[0].content.parts[0].text;
      this.chatHistory.push({ role: 'model', text: jawabanAI });
      this.isLoading =false;
    },
    error: (err: any) => {
      console.error( err);
      this.chatHistory.push ({ role: 'model', text:'Maaf, AI sedang pusing (Error koneksi).'});
      this.isLoading = false ;
    }
  });
}

}
