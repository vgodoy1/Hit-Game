import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HitGameService {
  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  public getTeams() {
    return this.http.get(`${this.apiURL}/times`);
  }
}
