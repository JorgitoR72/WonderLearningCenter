import { Routes } from '@angular/router';
import { UserComponent } from './views/user/user.component';
import { routesGuard } from './routes.guard';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent, canActivate: [routesGuard] },
  {
    path: 'security', children: [
      {
        path: 'register', component: RegisterComponent,
      },
      {
        path: 'login', component: LoginComponent,
      },
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }
];
