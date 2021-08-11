import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  resourceUrl = "http://localhost:8080/clientes";

  constructor(private http: HttpClient) { }

  save(cliente: Cliente) : Observable<any> {
    return this.http.post(`${this.resourceUrl}`, cliente);
  }

  listAll(): Observable<any>{
    return this.http.get(`${this.resourceUrl}`);
  }

  findOne(id: number): Observable<any>{
    return this.http.get(`${this.resourceUrl}/${id}`);
  }

  delete(id: number): Observable<any>{
    return this.http.get(`${this.resourceUrl}/deletar/${id}`);
  }
}
