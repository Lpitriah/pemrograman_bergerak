import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeComponent],
})
export class MerchantPage {
  namaMerchant = 'Bakso Pak Kumis';
  nominal = 10000;
  qrData = '';

  generateQR() {
    const data = {
      merchant: this.namaMerchant,
      harga: this.nominal
    };
    this.qrData = JSON.stringify(data);
  }
}
