import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/model/cliente.model';
import { Email } from 'src/app/shared/model/email.model';
import { Util } from 'src/app/shared/model/gs3util/util';
import { Telefone } from 'src/app/shared/model/telefone.model';
import { CepService } from 'src/app/shared/services/cep.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { DataShareServiceService } from 'src/app/shared/services/data-share-service.service';


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  form!: FormGroup;
  obrigatorio: Boolean = false

  constructor(private formBuilder: FormBuilder,
              private cepService: CepService,
              private clienteService: ClienteService,
              public dataShareServiceService: DataShareServiceService,
              private router: Router ) { }

  ngOnInit(): void {

    this.form = Util.modelToForm(new Cliente, this.formBuilder.group({}), this.formBuilder);

    if(this.dataShareServiceService.cliente){
        this.form.patchValue(this.dataShareServiceService.cliente);
    }
  }

  consultarCep() {
    let cep = this.form.get("cep")?.value;

    if(!cep){
      return;
    }

    this.cepService.consultarCep(cep).subscribe(
      dados => { this.popularForm(dados);}
    )

  }

  popularForm(dados: any){
    this.form.get("bairro")?.patchValue(dados?.bairro);
    this.form.get("cidade")?.patchValue(dados?.localidade);
    this.form.get("uf")?.patchValue(dados?.uf);
    this.form.get("complemento")?.patchValue(dados?.bairro);
    this.form.get("logradouro")?.patchValue(dados?.logradouro);

  }

  salvar() {

      if(this.form.invalid){
        this.obrigatorio = true;
        return;
      }

      this.clienteService.save(this.form.value).subscribe(
        dados => {
          this.router.navigate(['/listar']);
        }
      )
  }

  public getControl(): FormArray {
    return (<FormArray>this.form.get('telefones'));
  }

  public adicionarNovoTelefone() {
    let control = this.formBuilder.group(new Telefone());

    (<FormArray>this.form.get("telefones")).push(control);
  }

  public removerNovoTelefone(index: number) {
    (<FormArray>this.form.get("telefones")).removeAt(index);
  }

  public getControlEmail(): FormArray {
    return (<FormArray>this.form.get('emails'));
  }

  public adicionarNovoEmail() {
    let control = this.formBuilder.group(new Email());

    (<FormArray>this.form.get("emails")).push(control);
  }

  public removerNovoEmail(index: number) {
    (<FormArray>this.form.get("emails")).removeAt(index);
  }

  public validateLength(field : any)
    {
        if (field == 1)
        {
            if (this.form.get('telefones')?.get("0")?.get("telefone")?.value)
            {
                let telefone = this.form.get("telefones")?.get("0")?.get("telefone")?.value.length;

                if (telefone < 14)
                {
                    this.form.get("telefones")?.get("0")?.get("telefone")?.setValue(undefined);
                }
            }
        }
    }

    public retiraFormatacao(value: string): string
    {
        if (value)
        {
            return value.replace(/\D/g, '');
        }
        return value;
    }
}
