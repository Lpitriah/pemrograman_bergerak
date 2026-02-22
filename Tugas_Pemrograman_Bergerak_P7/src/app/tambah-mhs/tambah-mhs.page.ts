import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonInput, IonButton, IonText, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router'; // 🆕 Tambah ActivatedRoute
import { DataMahasiswaService } from '../services/data-mahasiswa.service';

@Component({
  selector: 'app-tambah-mhs',
  templateUrl: './tambah-mhs.page.html',
  styleUrls: ['./tambah-mhs.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonItem, IonInput, IonButton, IonText, IonSelect, IonSelectOption,
    CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class TambahMhsPage implements OnInit {

  formMahasiswa!: FormGroup;
  
  // 🆕 Mode halaman: tambah atau edit
  isEditMode: boolean = false;
  mahasiswaId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataMahasiswaService,
    private router: Router,
    private route: ActivatedRoute // 🆕 Untuk baca parameter URL
  ) { }

  async ngOnInit() {
    // Inisialisasi Form
    this.formMahasiswa = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(3)]],
      nim: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      jurusan: ['', [Validators.required]]
    });

    // 🆕 Cek apakah ada parameter ID di URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // Mode EDIT
      this.isEditMode = true;
      this.mahasiswaId = parseInt(id);
      await this.loadData();
    }
    // Jika tidak ada ID, mode TAMBAH (default)
  }

  // 🆕 Fungsi untuk load data saat mode edit
  async loadData() {
    if (this.mahasiswaId) {
      const mahasiswa = await this.dataService.getDataById(this.mahasiswaId);
      
      if (mahasiswa) {
        // Isi form dengan data yang sudah ada
        this.formMahasiswa.patchValue({
          nama: mahasiswa.nama,
          nim: mahasiswa.nim,
          jurusan: mahasiswa.jurusan
        });
      }
    }
  }

  // 🆕 Fungsi simpan yang bisa handle tambah DAN edit
  async simpanData() {
    if (this.formMahasiswa.valid) {

      if (this.isEditMode && this.mahasiswaId) {
        // MODE EDIT: Update data
        await this.dataService.editData(this.mahasiswaId, this.formMahasiswa.value);
        alert('Data Berhasil Diperbarui!');
      } else {
        // MODE TAMBAH: Tambah data baru
        await this.dataService.tambahData(this.formMahasiswa.value);
        alert('Data Berhasil Disimpan!');
      }

      console.log('Data Disimpan:', this.formMahasiswa.value);

      // Reset Form & Kembali ke Halaman Home
      this.formMahasiswa.reset();
      this.router.navigateByUrl('/home');

    } else {
      console.log('Form tidak valid');
      this.markFormGroupTouched(this.formMahasiswa);
    }
  }

  // Helper agar error muncul semua jika user memaksa klik submit
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}