import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './pages/cadastro-clientes/cadastro-clientes.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { HttpClient } from '@angular/common/http';
import { CepService } from './shared/services/cep.service';
import { HttpClientModule } from '@angular/common/http';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { TableModule } from 'primeng/table';
import { TelefoneDirective } from './shared/directive/telefone.directive';
import { ClienteService } from './shared/services/cliente.service';
import { DataShareServiceService } from './shared/services/data-share-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClientesComponent,
    ListarClientesComponent,
    TelefoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    InputMaskModule,
    KeyFilterModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RadioButtonModule,
    HttpClientModule,
    TableModule
  ],
  providers: [ CepService, ClienteService, DataShareServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
