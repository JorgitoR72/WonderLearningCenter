import { Routes } from '@angular/router';
import { routesGuard } from './routes.guard';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './views/site/home/home.component';
import { AboutusComponent } from './views/site/aboutus/aboutus.component';
import { ContactComponent } from './views/site/contact/contact.component';
import { ProfileComponent } from './views/dashboard/profile/profile.component';
import { CoursesComponent } from './views/dashboard/courses/courses.component';
import { ScheduleComponent } from './views/dashboard/schedule/schedule.component';


export const routes: Routes = [
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  {
    path: 'site', children: [
      {
        path: 'home', component: HomeComponent,
      },
      {
        path: 'aboutus', component: AboutusComponent,
      },
      {
        path: 'contact', component: ContactComponent,
      },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard', canActivate: [routesGuard], children: [
      {
        path: 'profile', children: [
          {
            path: 'myprofile', component: ProfileComponent,
          },
          {
            path: 'register', component: RegisterComponent,
          },
          {
            path: '', redirectTo: 'myprofile', pathMatch: 'full'
          }
        ]
      },
      {
        path: 'courses', component: CoursesComponent,
      },
      {
        path: 'schedule', component: ScheduleComponent,
      },
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      }
    ]
  },
  {
    path: 'security', children: [
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];
