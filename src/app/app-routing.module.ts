import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { LoggedInGuard } from './logged-in.guard';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { ChatViewComponent } from './chat-view/chat-view.component';

// Routing service that implements AuthGuards to block unauthorized users from certain navigation
const routes: Routes = [
    {path: 'home-page', component: HomeComponent, canActivate: [AuthguardGuard]},
    {path: 'new-profile', component: NewProfileComponent, canActivate: [LoggedInGuard]},
    {path: 'chat', component: ChatViewComponent, canActivate: [AuthguardGuard]},
    {path: '', component: LoginComponent, canActivate: [LoggedInGuard]},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
