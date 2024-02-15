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
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/site/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'aboutus',
        loadChildren: () => import('./views/site/aboutus/aboutus.module').then(m => m.AboutusModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./views/site/contact/contact.module').then(m => m.ContactModule),
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [routesGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./views/dashboard/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'schedule',
        loadChildren: () => import('./views/dashboard/schedule/schedule.module').then(m => m.ScheduleModule),
      },
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'security', component: SecurityComponent, children: [
      {
        path: 'login',
        loadChildren: () => import('./views/security/login/login.module').then(m => m.LoginModule),
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];
