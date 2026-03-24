import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Harsh Raj | Developer Portfolio'
  },
  {
    path: 'project/:slug',
    loadChildren: () =>
      import('./features/project-detail/project-detail.routes').then((module) => module.PROJECT_DETAIL_ROUTES),
    title: 'Project Details | Harsh Raj'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

