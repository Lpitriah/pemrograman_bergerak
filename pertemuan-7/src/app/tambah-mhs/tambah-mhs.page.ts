import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tambah-mhs',
  templateUrl: './tambah-mhs.page.html',
  styleUrls: ['./tambah-mhs.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TambahMhsPage implements OnInit {

  // Menampung data form
  formMahasiswa!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formMahasiswa = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(3)]],
      nim: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      jurusan: ['', [Validators.required]]
    });
  }

  // Fungsi saat tombol Simpan diklik
  simpanData() {
    if (this.formMahasiswa.valid) {
      console.log('Data Valid:', this.formMahasiswa.value);
      alert(
        'Berhasil! Data siap dikirim ke Backend:\n' +
        JSON.stringify(this.formMahasiswa.value)
      );
    } else {
      console.log('Form tidak valid');
      this.markFormGroupTouched(this.formMahasiswa);
    }
  }

  // Helper agar semua error muncul
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
