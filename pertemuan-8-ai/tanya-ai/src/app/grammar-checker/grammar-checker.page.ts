import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonTextarea,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-grammar-checker',
  templateUrl: './grammar-checker.page.html',
  styleUrls: ['./grammar-checker.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonTextarea,
    IonCard,
    IonCardContent
  ]
})
export class GrammarCheckerPage {

  textInput: string = '';
  result: any = null;

  // Observable manual
  private textChanged = new Subject<string>();

  constructor(private geminiService: GeminiService) {

    this.textChanged.pipe(
      debounceTime(1000), // tunggu 1 detik setelah user berhenti mengetik
      switchMap(text =>
        this.geminiService.generateText(
          `Check grammar for: "${text}". 
          Return valid JSON { "status": "Correct/Incorrect", "correction": "..." }`
        )
      )
    ).subscribe(response => {

      let output =
        response.candidates[0].content.parts[0].text;

      // 🔥 WAJIB: bersihkan format Markdown dari AI
      output = output
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      try {
        this.result = JSON.parse(output);
      } catch (error) {
        console.error('JSON Parse Error:', output);
      }

    });
  }

  onTextChange() {
    if (this.textInput.trim()) {
      this.textChanged.next(this.textInput);
    }
  }
}
