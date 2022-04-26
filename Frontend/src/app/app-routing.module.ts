import { PaginaInicialModule } from './modules/pagina-inicial/pagina-inicial.module';
import { TurmaFormacaoModule } from './modules/turma-formacao/turma-formacao.module';
import { CompetenciaModule } from './modules/competencia/competencia.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import { ColaboradorModule } from './modules/colaborador/colaborador.module';

const routes: Routes = [
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login-success', component: LoginSuccessComponent },
    {path: '', loadChildren: ()=> PaginaInicialModule},
    {path: 'competencia', loadChildren: () => CompetenciaModule, data: {breadcrumb: 'Competencia'}},
    { path: 'colaborador', loadChildren : () => ColaboradorModule, data: {breadcrumb: 'Colaborador'}},
    { path: 'turma', loadChildren : () => TurmaFormacaoModule}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
