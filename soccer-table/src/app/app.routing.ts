import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListGridComponent } from './pages/list-grid/list-grid.component';
import { TableComponent } from './pages/table/table.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'list-grid',
    component: ListGridComponent,
  },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
