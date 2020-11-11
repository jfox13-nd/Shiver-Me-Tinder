import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { LoggedInGuard } from './logged-in.guard';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ExpandProfileComponent } from './expand-profile/expand-profile.component';

// Routing service that implements AuthGuards to block unauthorized users from certain navigation
const routes: Routes = [
    {path: 'home-page', component: HomeComponent, canActivate: [AuthguardGuard]},
    {path: 'new-profile', component: NewProfileComponent, canActivate: [LoggedInGuard]},
    {path: '', component: LoginComponent, canActivate: [LoggedInGuard]},
    {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthguardGuard]},
    {path: 'expand-profile', component: ExpandProfileComponent, canActivate: [AuthguardGuard]},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
