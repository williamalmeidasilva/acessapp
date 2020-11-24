import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";


import 'rxjs/add/operator/map';

@Injectable()
export class Post{
    //server: string = 'https://softkleen.com.br/web/api/';
    server: string = "http://localhost/accessapi/"
    constructor (private http: HttpClient){
    } 
    
       
    dadosApi(dados:any,api:string){
        
        const httpOptions = {
         headers:  new HttpHeaders({'Content-Type':'application/json'})
        };

        let url = this.server + api;
        return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
    }

}