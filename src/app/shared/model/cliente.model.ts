import { Email } from "./email.model";
import { Telefone } from "./telefone.model";

export class Cliente {

  constructor(
    public id?: number,
    public nome ?:string,
    public cpf ?:string,
    public cep ?:string,
    public logradouro ?:string,
    public bairro ?:string,
    public cidade ?: string,
    public uf ?: string,
    public complemento ?: string,
    public telefones : Telefone[] = [new Telefone()],
    public emails : Email[] = [new Email()],
  ) {
  }
}
