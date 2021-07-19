import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.model';
import { Autenticacao } from '../../Autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter()




  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.email),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null, Validators.minLength(6))
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void{
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {
    let form: FormGroup = this.formulario
    let usuario: Usuario = new Usuario(
      form.value.email,
      form.value.nome_completo,
      form.value.nome_usuario,
      form.value.senha,
      
      );
      this.autenticacao.cadastrarUsuario(usuario)
      .then(() => {
        this.exibirPainelLogin()
      })
  }

}
