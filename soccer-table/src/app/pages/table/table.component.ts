import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SoccerTable } from 'src/interfaces/soccer-table';
import { HitGameService } from 'src/services/hit-game.service';

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

  public teams$ = new BehaviorSubject<SoccerTable[]>([]);

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public router: Router, private hitGameService: HitGameService) {}

  ngOnInit(): void {
    this.hitGameService
      .getAllTeams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((teams) => this.teams$.next(teams));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
