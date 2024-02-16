import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../../views/dashboard/profile/profile.component';
import { ScheduleComponent } from '../../views/dashboard/schedule/schedule.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
