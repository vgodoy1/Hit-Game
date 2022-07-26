import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Card {
  name: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public routes = new Map<string, string>([
    ['Tabela', '/table'],
    ['List Grid', '/list-grid'],
  ]);

  public cards: Card[] = [
    {
      name: 'Tabela',
      image: '../../assets/images/soccer-image-01.jpg',
    },
    {
      name: 'List Grid',
      image: '../../assets/images/soccer-image-02.jpg',
    },
  ];

  constructor(public router: Router) {}
}
