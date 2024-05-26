import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./tab3/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./tab3/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'laberinto-end',
    loadChildren: () => import('./tab1/laberinto-end/laberinto-end.module').then( m => m.LaberintoEndPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
