import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente.model';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { DataShareServiceService } from 'src/app/shared/services/data-share-service.service';


@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clienteService: ClienteService,
              public dataShareServiceService: DataShareServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.listarTodos();
    this.dataShareServiceService.cliente = new Cliente;
  }

  listarTodos(){
    this.clienteService.listAll().subscribe(
      dados => this.clientes = dados
    )
  }

  update(cliente: Cliente){
    this.dataShareServiceService.cliente = cliente;
    this.router.navigate(['/cadastro']);
  }

  delete(id:number){
    this.clienteService.delete(id).subscribe(
      dados => {
        this.listarTodos();
      }
    )
  }
}
