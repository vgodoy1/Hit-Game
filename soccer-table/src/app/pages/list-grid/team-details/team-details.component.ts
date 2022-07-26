import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SoccerTable } from 'src/interfaces/soccer-table';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  public dataKeys$ = new BehaviorSubject<string[]>([]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: SoccerTable) {}

  ngOnInit(): void {
    this.dataKeys$.next(Object.keys(this.data));
  }
}
