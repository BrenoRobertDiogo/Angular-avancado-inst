import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { Bd } from '../../bd.service';
import { KeysPipe	 } from './KeysPipe.pipe';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {
  public email: string
  public publicacoes: any
  public listaHeaders: string[]

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.email = user.email

      this.atualizarTimeLine()

    })
    console.log(firebase.database().ref(`publicacoes/${btoa(this.email)}`));
    console.log(this.publicacoes);
  }

  public atualizarTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
    .then((publicacoes) => {
      this.publicacoes = publicacoes
    })
    
    
  }

  public Comentar(key: string, comentario: string): void {
    this.bd.Comentar(this.email, key, comentario)
    this.atualizarTimeLine()
  }

}
