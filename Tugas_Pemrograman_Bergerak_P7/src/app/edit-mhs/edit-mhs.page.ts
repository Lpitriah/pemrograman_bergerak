import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonItem, IonLabel, IonButton,
  IonBackButton, IonButtons
} from '@ionic/angular/standalone';

import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-edit-mhs',
  templateUrl: './edit-mhs.page.html',
  styleUrls: ['./edit-mhs.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonItem, IonLabel, IonButton,
    IonBackButton, IonButtons
  ]
})
export class EditMhsPage implements OnInit {

  mahasiswaId!: number;
  nama: string = '';
  nim: string = '';
  jurusan: string = '';

  constructor(
    private dataService: DataMahasiswaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    // Ambil ID dari URL parameter
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.mahasiswaId = parseInt(id);
      await this.loadData();
    }
  }

  async loadData() {
    // Ambil data mahasiswa berdasarkan ID
    const mahasiswa = await this.dataService.getDataById(this.mahasiswaId);

    if (mahasiswa) {
      this.nama = mahasiswa.nama;
      this.nim = mahasiswa.nim;
      this.jurusan = mahasiswa.jurusan;
    }
  }

  async simpan() {
    if (!this.nama || !this.nim || !this.jurusan) {
      alert('Harap isi semua kolom!');
      return;
    }

    const mahasiswaUpdate = {
      nama: this.nama,
      nim: this.nim,
      jurusan: this.jurusan
    };

    await this.dataService.editData(this.mahasiswaId, mahasiswaUpdate);

    alert('Data berhasil diperbarui!');
    this.router.navigate(['/home']);
  }

  batal() {
    this.router.navigate(['/home']);
  }
}