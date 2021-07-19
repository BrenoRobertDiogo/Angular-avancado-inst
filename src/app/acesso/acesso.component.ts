import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(-50px, 0)'}),
        animate('500ms 100ms ease-in-out') // duração, delay, 
      ])
    ]),
    trigger('animacao-painel', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({opacity: 0, transform: 'translate(50px, 0)'}),
         animate('500ms 100ms ease-in-out',/*  keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)' }),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)' }),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(-10px)' }),
          style({ offset: 1, opacity: 1, transform: 'translateY(0px)' })
        ]) */) // duração, delay, 
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado'
  public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string) {
    this.cadastro = event === 'cadastro' ? true : false
    // console.log('PARAMETRO É '+event);
    
  }

  public inicioDaAnimacao(): void {
    // console.log('Inicio da animação');
    
  }
  public fimDaAnimacao(): void {
    // console.log('Inicio da animação');
    
  }

}
