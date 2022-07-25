import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, reduce } from 'rxjs';
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
  public teams = new BehaviorSubject<SoccerTable[]>([]);

  public form = new FormGroup({
    name: new FormControl(),
    percentage: new FormControl(),
    goals: new FormControl(),
    wonLastGame: new FormControl(),
    lostLastGame: new FormControl(),
  });

  public checklist: Checklist[] = [
    { id: 1, value: 'Ultimo jogo com vitória', isSelected: false },
    { id: 2, value: 'Ultimo jogo com derrota', isSelected: false },
  ];

  constructor(
    public router: Router,
    private hitGameService: HitGameService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.hitGameService.getTeams().subscribe((teams) => this.teams.next(teams));
  }

  public applyFilter(): void {
    if (this.form.value.percentage) {
      this.teams.next(
        this.teams?.value?.filter(
          (team) => team.aproveitamento > this.form.value.percentage
        )
      );
    }

    if (this.form.value.name) {
      this.teams.next(
        this.teams?.value?.filter((team) =>
          team.time.nome_popular
            .toLowerCase()
            .includes(this.form.value.name.toLowerCase())
        )
      );
    }

    if (this.form.value.goals) {
      this.teams.next(
        this.teams?.value?.filter(
          (team) => team.gols_pro - team.gols_contra > this.form.value.goals
        )
      );
    }

    if (this.form.value.wonLastGame) {
      this.teams.next(
        this.teams?.value?.filter((team) => team.ultimos_jogos[0] === 'v')
      );
    }

    if (this.form.value.lostLastGame) {
      this.teams.next(
        this.teams?.value?.filter((team) => team.ultimos_jogos[0] === 'd')
      );
    }
  }

  public isAllSelected(item: Checklist): void {
    this.checklist.forEach((checkbox) => {
      if (checkbox.id == item.id) {
        checkbox.isSelected = !checkbox.isSelected;
      } else {
        checkbox.isSelected = false;
      }
    });
  }

  public openModal(team: SoccerTable): void {
    this.dialog.open(TeamDetailsComponent, {
      data: team,
    });
  }
}
