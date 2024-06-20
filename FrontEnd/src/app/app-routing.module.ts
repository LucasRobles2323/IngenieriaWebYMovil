import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'resolver-laberinto',
    loadChildren: () => import('./pages/resolver-laberinto/resolver-laberinto.module').then( m => m.ResolverLaberintoPageModule)
  },
  {
    path: 'control-robot',
    loadChildren: () => import('./pages/control-robot/control-robot.module').then( m => m.ControlRobotPageModule)
  },
  {
    path: '',
    redirectTo: 'resolver-laberinto',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
