import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../core/auth-guard.service';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(dashboardRoutes)
    ]
})
export class DashboardRoutingModule { }
