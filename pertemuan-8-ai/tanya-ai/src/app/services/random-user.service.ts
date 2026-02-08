import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  private apiUrl='https://randomuser.me/api/';
  constructor(private http:HttpClient) {}

  getRandomUser():Promise<any>{
    return lastValueFrom(this.http.get(this.apiUrl));
  }
}
