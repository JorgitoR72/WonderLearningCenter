import { Routes } from '@angular/router';
import { SiteComponent } from './layouts/site/site.component';
import { SecurityComponent } from './layouts/security/security.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { dashboardaccessGuard } from './guards/dashboardaccess/dashboardaccess.guard';
import { ProfileComponent } from './views/dashboard/profile/profile.component';
import { MyprofileComponent } from './views/dashboard/profile/myprofile/myprofile.component';
import { notstudentGuard } from './guards/notstudent/notstudent.guard';
import { UserslistComponent } from './views/dashboard/profile/userslist/userslist.component';
import { RegisterComponent } from './views/dashboard/profile/register/register.component';
import { ScheduleComponent } from './views/dashboard/schedule/schedule.component';
import { LoginComponent } from './views/security/login/login.component';
import { HomeComponent } from './views/site/home/home.component';
import { AboutusComponent } from './views/site/aboutus/aboutus.component';
import { ContactComponent } from './views/site/contact/contact.component';
import { SubjectsComponent } from './views/dashboard/subjects/subjects.component';
import { securityguardGuard } from './guards/security/securityguard.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'site', pathMatch: 'full' },
  {
    path: 'site',
    component: SiteComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [dashboardaccessGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'myprofile',
            component: MyprofileComponent
          },
          {
            path: 'userslist',
            canActivate: [notstudentGuard],
            component: UserslistComponent
          },
          {
            path: 'register',
            canActivate: [notstudentGuard],
            component: RegisterComponent
          },
          {
            path: '',
            redirectTo: 'myprofile',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'schedule',
        component: ScheduleComponent
      },
      {
        path: 'subjects',
        component: SubjectsComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'security', component: SecurityComponent,
    canActivate: [securityguardGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full',
      }
    ]
  }
];
