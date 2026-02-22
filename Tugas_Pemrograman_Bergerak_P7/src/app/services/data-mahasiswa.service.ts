import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataMahasiswaService {

  private KEY_MAHASISWA = 'data_mahasiswa_app';

  constructor() { }

  // FUNGSI 1: Membaca Data
  async getData() {
    const { value } = await Preferences.get({ key: this.KEY_MAHASISWA });
    return value ? JSON.parse(value) : [];
  }

  // FUNGSI 2: Menambah Data Baru
  async tambahData(mahasiswaBaru: any) {
    const dataLama = await this.getData();
    mahasiswaBaru.id = Date.now();
    dataLama.push(mahasiswaBaru);

    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataLama)
    });
  }

  // FUNGSI 3: Hapus Data
  async hapusData(id: number) {
    const dataLama = await this.getData();
    const dataBaru = dataLama.filter((item: any) => item.id !== id);

    return await Preferences.set({
      key: this.KEY_MAHASISWA,
      value: JSON.stringify(dataBaru)
    });
  }

  // 🆕 FUNGSI 4: Edit/Update Data
  async editData(id: number, mahasiswaUpdate: any) {
    const dataLama = await this.getData();

    // Cari index mahasiswa yang akan diedit
    const index = dataLama.findIndex((item: any) => item.id === id);

    if (index !== -1) {
      // Update data (tetap pertahankan ID yang lama)
      dataLama[index] = { ...mahasiswaUpdate, id: id };

      // Simpan kembali
      return await Preferences.set({
        key: this.KEY_MAHASISWA,
        value: JSON.stringify(dataLama)
      });
    }

    return false;
  }

  // 🆕 FUNGSI 5: Ambil Data Berdasarkan ID (untuk form edit)
  async getDataById(id: number) {
    const semuaData = await this.getData();
    return semuaData.find((item: any) => item.id === id);
  }
}