import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClientesComponent } from './pages/cadastro-clientes/cadastro-clientes.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroClientesComponent },
  { path: 'listar', component: ListarClientesComponent },
  { path: '', redirectTo: '/#', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
