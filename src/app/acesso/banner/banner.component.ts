import { Component, OnInit } from '@angular/core';
import { state, style, trigger, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model'

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('0.5s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'

  public imagens: Imagem[] = [{
    estado: 'visivel',
    url: '/assets/banner-acesso/img_1.png'
  }, {
    estado: 'escondido',
    url: '/assets/banner-acesso/img_2.png'
  }, {
    estado: 'escondido',
    url: '/assets/banner-acesso/img_3.png'
  }, {
    estado: 'escondido',
    url: '/assets/banner-acesso/img_4.png'
  },]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  /**
   * logicaRotacao
   */
  public logicaRotacao(): void {
    // Ocultar imagem
    let idx: number 
    for (let index = 0; index < this.imagens.length; index++) {
      if (this.imagens[index].estado === 'visivel') {
        this.imagens[index].estado = 'escondido'
        idx = index === this.imagens.length-1 ? 0 : ++index
        break
      }
      
    }

    // Exibir proxima imagem
    this.imagens[idx].estado = 'visivel'
    


    setTimeout(() => this.logicaRotacao(), 3000);
    
  }

}
