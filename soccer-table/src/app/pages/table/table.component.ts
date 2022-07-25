import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SoccerTable } from 'src/interfaces/soccer-table';
import { HitGameService } from 'src/services/hit-game.service';

export enum GameResults {
  victory = 'v',
  draw = 'e',
  defeat = 'd',
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public tableColumns = [
    'Posição',
    'Pontos',
    'Nome',
    'Sigla',
    'Escudo',
    'Jogos',
    'Vitórias',
    'Empates',
    'Gols Pró',
    'Gols Contra',
    'Saldo',
    'Aproveitamento',
    'Últimos Jogos',
  ];

  public teams = new BehaviorSubject<SoccerTable[]>([]);

  constructor(public router: Router, private hitGameService: HitGameService) {}

  ngOnInit(): void {
    this.hitGameService
      .getTeams()
      .subscribe((teams: any) => this.teams.next(teams));
  }
}
