import { CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { Autenticacao } from "./Autenticacao.service";

@Injectable()
export class AutenticacaoGuard implements CanActivate{
    constructor(
        public autenticacao: Autenticacao
    ){}
    canActivate(): boolean {
        return this.autenticacao.autenticado()
    }


}