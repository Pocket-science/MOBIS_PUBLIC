import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {  path: 'login',
loadChildren: () => import('../auth/login/login.module').then( m => m.LoginPageModule)
},

{
  path: 'profile',
  loadChildren: () => import('../auth/profile/profile.module').then( m => m.ProfilePageModule),
  ...canActivate(redirectUnauthorizedToLogin)
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
