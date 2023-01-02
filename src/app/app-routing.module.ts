import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToProfile)
  },
  {
    path: 'resetpw',
    loadChildren: () => import('./auth/resetpw/resetpw.module').then( m => m.ResetpwPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./auth/profile/profile.module').then( m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'observe',
    loadChildren: () => import('./observe/observe.module').then( m => m.MeasurePageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'plantnet',
    loadChildren: () => import('./mobisplugins/plantnet/plantnet.module').then( m => m.PlantnetPageModule)
  },
  {
    path: 'ispex',
    loadChildren: () => import('./mobisplugins/ispex/ispex.module').then( m => m.IspexPageModule)
  },
  {
    path: 'minisecchi',
    loadChildren: () => import('./mobisplugins/minisecchi/minisecchi.module').then( m => m.MinisecchiPageModule)
  },
  {
    path: 'canairiopm25',
    loadChildren: () => import('./mobisplugins/canairiopm25/canairiopm25.module').then( m => m.Canairiopm25PageModule)
  },

  {
    path: 'canairioco2',
    loadChildren: () => import('./mobisplugins/canairioco2/canairioco2.module').then( m => m.Canairioco2PageModule)
  },

  {
    path: 'ms_measure',
    loadChildren: () => import('./mobisplugins/minisecchi/measure/measure.module').then( m => m.MeasurePageModule)
  },
  {
    path: 'ms_instructions',
    loadChildren: () => import('./mobisplugins/minisecchi/instructions/instructions.module').then( m => m.InstructionsPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
