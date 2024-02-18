import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserslistComponent } from '../../../views/dashboard/profile/userslist/userslist.component';
import { MyprofileComponent } from '../../../views/dashboard/profile/myprofile/myprofile.component';
import { RegisterComponent } from '../../../views/dashboard/profile/register/register.component';

const routes: Routes = [
  {
    path: 'myprofile',
    component: MyprofileComponent
  },
  {
    path: 'userslist',
    component: UserslistComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'myprofile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
