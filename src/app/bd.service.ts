import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class Bd {



    constructor(
        private progresso: Progresso
    ) {

    }

    public publicar(publicacao: any): void {
        /* firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({ titulo: publicacao.titulo }) */

        let nomeImagem = Date.now()
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo, url_imagem: nomeImagem, comentarios: publicacao.comentarios })
            .then((resposta: any) => {
                nomeImagem = resposta.key
                // console.log(resposta);
                firebase.database().ref(`publicacoes/${btoa(publicacao.email)}/${resposta.key}`)
                .update({key: resposta.key})
                
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot

                        },
                        (error) => {
                            this.progresso.status = 'erro'
                        },
                        () => {
                            this.progresso.status = 'concluido'

                        }
                    )
            })

    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            let publicacoes: Array<any> = []
            // console.log(firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`));
            
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .orderByKey()
                .once(`value`)
                .then((snapshot: any) => {
                    console.log(snapshot);
                    

                    snapshot.forEach(childSnapshot => {

                        let publicacao = childSnapshot.val()
                        publicacao.key = childSnapshot.key

                        publicacoes.push(publicacao)

                    })
                    // resolve(publicacoes);
                    return publicacoes.reverse()


                })
                .then((publicacoes: any) => {

                    publicacoes.forEach(publicacao => {
                        
                        // let publicacao = childSnapshot.val()
                        firebase.storage().ref()
                            .child(`imagens/${publicacao.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url
    
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
    
                                        publicacao.nome_usuario = snapshot.val().nome_usuario
    
                                        // publicacoes.push(publicacao)
                                    })
    
                            })
                    });
                    resolve(publicacoes)

                })
        })
    }

    public Comentar(emailUsuario: string, key: string, comentario: string): any {
        console.log(firebase.database().ref(`publicacoes/${btoa(emailUsuario)}/${key}/comentarios`));
        
        
        let frase: any = firebase.database().ref(`publicacoes/${btoa(emailUsuario)}/${key}/comentarios`)
        .push({comentario: comentario, nomePessoa: 'Nicolas Cage'});
        console.log('Frase foi: ');
        
        console.log(frase);
        return frase
        
        // console.log(firebase.database().ref(`publicacoes/${btoa(emailUsuario)}/${key}/comentarios`));
    }


}