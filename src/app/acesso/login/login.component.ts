import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, MinLengthValidator } from '@angular/forms';
import { Autenticacao } from '../../Autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public erro: string

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.email),
    'senha': new FormControl(null, Validators.minLength(6))
  })

  constructor(
    private autenticacao: Autenticacao

  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro')
    
  }

  public autenticar() {
    this.autenticacao.autenticar(this.formulario.value.email, this.formulario.value.senha)
    this.erro = this.autenticacao.msgErro
  }

}
