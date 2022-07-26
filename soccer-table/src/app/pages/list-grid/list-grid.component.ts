import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { SoccerTable } from 'src/interfaces/soccer-table';
import { HitGameService } from 'src/services/hit-game.service';
import { TeamDetailsComponent } from './team-details/team-details.component';

interface Checklist {
  id: number;
  value: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-list-grid',
  templateUrl: './list-grid.component.html',
  styleUrls: ['./list-grid.component.scss'],
})
export class ListGridComponent implements OnInit {
  public teams$ = new BehaviorSubject<SoccerTable[]>([]);
  public filteredTeams$ = new BehaviorSubject<SoccerTable[]>([]);

  public form = new FormGroup({
    name: new FormControl(),
    percentage: new FormControl(),
    goals: new FormControl(),
    wonLastGame: new FormControl(),
    lostLastGame: new FormControl(),
  });

  public checklist: Checklist[] = [
    {
      id: 1,
      value: 'Ultimo jogo com vitória',
      isSelected: false,
    },
    {
      id: 2,
      value: 'Ultimo jogo com derrota',
      isSelected: false,
    },
  ];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public router: Router,
    private hitGameService: HitGameService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTeams();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public getTeams(): void {
    this.hitGameService
      .getAllTeams()
      .pipe(takeUntil(this.destroy$))
      .subscribe((teams) => {
        this.teams$.next(teams);
        this.filteredTeams$.next(teams);
      });
  }

  public applyFilter(): void {
    if (
      this.form.dirty ||
      !!this.form.value.wonLastGame ||
      !!this.form.value.lostLastGame
    ) {
      this.filteredTeams$.next([]);

      if (this.form.value.percentage) {
        this.filteredTeams$.next([
          ...this.filteredTeams$.value,
          ...this.teams$?.value?.filter(
            (team) => team.aproveitamento > this.form.value.percentage
          ),
        ]);
      }

      if (this.form.value.name) {
        this.filteredTeams$.next([
          ...this.filteredTeams$.value,
          ...this.teams$?.value?.filter((team) =>
            team.time.nome_popular
              .toLowerCase()
              .includes(this.form.value.name.toLowerCase())
          ),
        ]);
      }

      if (this.form.value.goals) {
        this.filteredTeams$.next([
          ...this.filteredTeams$.value,
          ...this.teams$?.value?.filter(
            (team) => team.gols_pro - team.gols_contra > this.form.value.goals
          ),
        ]);
      }

      if (this.form.value.wonLastGame) {
        this.filteredTeams$.next([
          ...this.filteredTeams$.value,
          ...this.teams$?.value?.filter(
            (team) => team.ultimos_jogos[0] === 'v'
          ),
        ]);
      }

      if (this.form.value.lostLastGame) {
        this.filteredTeams$.next([
          ...this.filteredTeams$.value,
          ...this.teams$?.value?.filter(
            (team) => team.ultimos_jogos[0] === 'd'
          ),
        ]);
      }

      let teamsName: string[] = [];
      let counts: any = {};
      let finalTeams: string[] = [];

      const filtersApplied = Object.values(this.form.getRawValue()).filter(
        (values) => !!values
      ).length;

      Object.values(this.filteredTeams$.value).filter((value) => {
        teamsName.push(value.time.nome_popular);
      });

      teamsName.map((team, i) => {
        counts[teamsName[i]] = counts[teamsName[i]] + 1 || 1;
      });

      for (let prop in counts) {
        if (counts[prop] === filtersApplied) {
          finalTeams.push(prop);
        }
      }

      this.filteredTeams$.next(
        this.filteredTeams$.value
          .filter((team) => finalTeams.includes(team.time.nome_popular))
          .slice(0, finalTeams.length)
      );
    } else {
      this.clearFilters();
    }
  }

  public selectOption(item: Checklist): void {
    this.checklist.forEach((checkbox) => {
      if (checkbox.id == item.id) {
        checkbox.isSelected = !checkbox.isSelected;
      } else {
        checkbox.isSelected = false;
      }
    });

    this.form.controls.wonLastGame.patchValue(
      item.id === 1 && item.isSelected ? true : null
    );
    this.form.controls.lostLastGame.patchValue(
      item.id === 2 && item.isSelected ? true : null
    );
  }

  public openModal(team: SoccerTable): void {
    this.dialog.open(TeamDetailsComponent, {
      data: team,
      width: '25vw',
    });
  }

  public clearFilters(): void {
    this.filteredTeams$.next(this.teams$.value);
    this.form.reset();
    this.form.controls.lostLastGame.reset();
    this.form.controls.wonLastGame.reset();

    this.checklist.forEach((checkbox) => {
      checkbox.isSelected = false;
    });
  }
}
