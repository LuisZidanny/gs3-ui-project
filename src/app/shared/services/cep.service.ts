import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) {}

  consultarCep(cep: any) : Observable<any>{
    return this.http.get(`//viacep.com.br/ws/${cep}/json`);
  }
}
