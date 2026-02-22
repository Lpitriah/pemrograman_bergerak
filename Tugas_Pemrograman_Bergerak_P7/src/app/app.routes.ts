import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/detail.page').then(m => m.DetailPage)
  },
  {
    path: 'tambah-mhs',
    loadComponent: () => import('./tambah-mhs/tambah-mhs.page').then(m => m.TambahMhsPage)
  },
  // 🆕 Route untuk Edit (menggunakan halaman yang sama dengan tambah)
  {
    path: 'tambah-mhs/:id',
    loadComponent: () => import('./tambah-mhs/tambah-mhs.page').then(m => m.TambahMhsPage)
  },  {
    path: 'edit-mhs',
    loadComponent: () => import('./edit-mhs/edit-mhs.page').then( m => m.EditMhsPage)
  },

];