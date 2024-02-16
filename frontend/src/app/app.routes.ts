import { Routes } from '@angular/router';
import { routesGuard } from './routes.guard';
import { SiteComponent } from './layouts/site/site.component';
import { SecurityComponent } from './layouts/security/security.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  {
    path: 'site',
    component: SiteComponent,
    loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [routesGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'security', component: SecurityComponent,
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule),
  }
];
