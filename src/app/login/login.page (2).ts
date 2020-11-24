import { async } from '@angular/core/testing';
import { Post } from './../../services/post';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string ="";
  senha: string ="";

  constructor(private router: Router, private provider:Post, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  async login(){
    if(this.usuario==''){
      const toast = await this.toastCtrl.create({
        message: 'Preencha o nome de Usuário',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }
    if(this.senha==''){
      const toast = await this.toastCtrl.create({
        message: "Preencha a senha",
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }
    let dados = {
      requisicao: 'login',
      usuario : this.usuario,
      senha: this.senha
    };
    // dados é o que está sendo passado como parâmetro para a api...
    // data é o que está sendo retornado da api.

    this.provider.dadosApi(dados,'api.php').subscribe(async data => {
     //debugger;
     let dados = data['result'];
     // var alerta = data['msg'];//? msg !! 
      if(data['success']){// 'success'
       if(dados['nivel']=='admin'){
          this.router.navigate(['/folder'])
        }
        else if(dados['nivel']=='aluno'){
          this.router.navigate(['/home-aluno'])
        }
        else {// deixe sua imaginação fluir aqui mesmo
          this.router.navigate(['/cursos'])
        }
       
        //this.router.navigate(['/folder']);
        const toast = await this.toastCtrl.create({
          message: 'Login: '+ dados.nivel +' - '+ dados.nome + ', sucesso',
          duration: 3000,
          color: 'success'
        });
        toast.present();
        this.usuario = "";
        this.senha="";
        // teste de retorno de dados....
        console.log(data);
      }
      else{
        const toast = await this.toastCtrl.create({
          message: data['msg'], //alerta,
          duration: 2000,
          color: 'danger'    
        });
        toast.present();
      }

    });


  }


}