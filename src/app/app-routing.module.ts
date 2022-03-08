import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dbhome',
    pathMatch: 'full'
  },
  {
    path: 'avatarpg',
    loadChildren: () => import('./avatarpg/avatarpg.module').then( m => m.AvatarpgPageModule)
  },
  {
    path: 'avatarresult/:sendobj',
    loadChildren: () => import('./avatarresult/avatarresult.module').then( m => m.AvatarresultPageModule)
  },
  {
    path: 'dbhome',
    loadChildren: () => import('./dbhome/dbhome.module').then( m => m.DbhomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
