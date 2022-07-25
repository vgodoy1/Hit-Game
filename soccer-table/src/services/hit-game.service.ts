import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SoccerTable } from 'src/interfaces/soccer-table';

@Injectable({
  providedIn: 'root',
})
export class HitGameService {
  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';
  }

  public getTeams(): Observable<any> {
    return this.http.get(`${this.apiURL}/times`);
  }
}
