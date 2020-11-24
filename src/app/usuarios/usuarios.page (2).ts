import { Post } from './../../services/post';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  nome: string="";
  limit:number=10;
  start: number = 0;
  usuarios: any = [];
  constructor(private route: Router, private provider : Post) { }

  ngOnInit() {// ao iniciar
  }
  ionViewWillEnter(){ //debugger;
    this.usuarios=[];
    this.start=0;
    this.carregar();
  }
 
  addUsuarios(){
    this.route.navigate(['add-usuario']);
  } 
  carregar(){
    return new Promise(resolve => {
      this.usuarios= [];//limpa a matriz  - zera
      let dados = {
        requisicao: 'listar',
        nome: this.nome,
        limit: this.limit,
        start: this.start
      };
      this.provider.dadosApi(dados, 'api.php').subscribe(data =>{
        if(data['result'] == '0'){
          this.ionViewWillEnter()
        }else{
          for(let usuario of data['result']){
            this.usuarios.push(usuario)
          }
        }
        resolve(true);
      });
    });
  }//final do método carregar
  editar(id, nome, usuario, senha, nivel){
    this.route.navigate(['/add-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }//final do método Editar
  mostrar(id, nome, usuario, senha, nivel){
    this.route.navigate(['/mostrar-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }//final do método Mostrar
  excluir(id){
    return new Promise(resolve =>{
      let dados = {
        requisicao: 'excluir',
        id: identifierModuleUrl,
      };
      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.ionViewWillEnter();
      });
    });
  }//final do método excluir

}
