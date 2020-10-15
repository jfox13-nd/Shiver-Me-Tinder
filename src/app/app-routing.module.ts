import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    {path: 'home-page', component: HomeComponent, canActivate: [AuthguardGuard]},
    {path: 'new-profile', component: NewProfileComponent},
    {path: '', component: LoginComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
