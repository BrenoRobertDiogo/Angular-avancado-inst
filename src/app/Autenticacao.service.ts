import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class Autenticacao {

    public tokenId: string

    public msgErro: string

    constructor(
        private router: Router
    ){}


    public async cadastrarUsuario( usuario: Usuario ): Promise<any> {
        console.log('Chegamos no cadastrarUsuario com o ');
        console.log(usuario);
        let resposta: Promise<any>

        try {
            resposta = await firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha )
            // remover senha do attr senha do obj usuario
            delete usuario.senha
            // registrando dados do user do path email na b64
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set(usuario)

            console.log('RESPOSTA É ');
            
            console.log(resposta);
            
        } catch (error) {
            console.log(error);
            
        }
        return resposta

    }

    /**
     * autenticar
     */
    public async autenticar(email: string, senha: string) {
        
        let mensagemErro: string = ''
        try {
            let resposta: any = await firebase.auth().signInWithEmailAndPassword(email, senha)
            this.tokenId = await firebase.auth().currentUser.getIdToken()
            localStorage.setItem('idToken', this.tokenId)

            this.router.navigate(['home'])
            // console.log(resposta);
            // console.log(this.tokenId);
            
        } catch (error) {
            console.log(error);
            
            mensagemErro = error
            
        }
        this.msgErro =  mensagemErro === null || mensagemErro === undefined || mensagemErro === '' ? '' : mensagemErro
    }

    public autenticado(): boolean {

        if (localStorage.getItem('idToken') != null ) {
            this.tokenId = localStorage.getItem('idToken')
            // console.log(this.tokenId);
            
        }


        return this.tokenId !== undefined
    }

    public sair(): void {
        firebase.auth().signOut()
        localStorage.removeItem('idToken')
        this.tokenId = undefined
        this.router.navigate(['/'])
    }

}