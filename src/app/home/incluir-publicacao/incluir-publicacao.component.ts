import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Bd } from '../../bd.service';
import * as firebase from 'firebase'
import { Progresso } from '../../progresso.service';
import { Observable } from 'rxjs';
import 'rxjs'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
  @Output()
  public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  public email: string
  private imagem: any
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.email = user.email
    })
  }


  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
      comentarios: [] // {nomePessoa: 'Nicolas', comentario: 'Opa meu amigo'}, {nomePessoa: 'Cage', comentario: 'Tudo bem?'}
    })

    let acompanhamentoUpload = Observable.interval(700)

    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload
    .takeUntil(continua)
    .subscribe(() => {
      this.progressoPublicacao = 'andamento'

      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

      if (this.progresso.status === 'concluido') {
        this.progressoPublicacao = 'concluido'

        this.atualizarTimeLine.emit()

        continua.next(false)
      }

    })
  }

  /**
   * preparaImagemUpload
   */
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
     
  }

}