import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Filters {
  name: string;
  percentage: number;
  goals: number;
  wonLastGame: boolean;
  lostLastGame: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HitGameService {
  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  public getAllTeams(): Observable<any> {
    return this.http.get(`${this.apiURL}/times`);
  }
}
