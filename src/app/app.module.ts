import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { FormsModule } from '@angular/forms';
import { Progresso } from './progresso.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ReactiveFormsModule } from '@angular/forms';
import { Autenticacao } from './Autenticacao.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { Bd } from './bd.service';
import { KeysPipe } from './home/publicacoes/KeysPipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Autenticacao, AutenticacaoGuard, Bd, Progresso ],
  bootstrap: [AppComponent]
})
export class AppModule { }
