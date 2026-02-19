import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, AlertController, ToastController,  } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  //state awal
  saldo=100000;
  history: any[]= [];
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  //fungsi scan qris
  async scanQR() {
    //cek izin kamera
    const status= await BarcodeScanner.checkPermissions();
    if (status.camera !=='granted') {
      await BarcodeScanner.requestPermissions();
    }
    document.querySelector('body')?.classList.add('barcode-scanner-active');

    //mulai scanning
    const {barcodes}= await BarcodeScanner.scan();

    document.querySelector('body')?.classList.remove('barcode-scanner-active');

    //proses hasil scan
    if (barcodes.length > 0) {
  const scannedData = barcodes[0].rawValue;

  if (scannedData) {
    this.prosesPembayaran(scannedData);
  }
}

  }

  //logika pembayaran
  async prosesPembayaran (merchant: string) {
    const bayar= 15000;
    if (this.saldo >= bayar) {
      //kurangi saldo
      this.saldo -= bayar
      // catat history
      this.history.unshift({
        waktu: new Date().toLocaleTimeString (),
        nominal:bayar
      });
      
      this.tampilkanToast (`Berhasil bayar ke ${merchant}`,'succes');
    } else {
      this.tampilkanToast ('Saldo tidak cukup', 'danger');
    }
  }
  async tampilkanToast(msg: string, color:string) {
    const toast = await this.toastCtrl.create ({
      message: msg, duration: 2000, color: color, position:'top'
    });
    toast.present();
  }
}
