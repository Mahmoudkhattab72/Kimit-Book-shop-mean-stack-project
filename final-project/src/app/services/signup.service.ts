import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
constructor(private httpClient:HttpClient) {}
  add(signup:any){
    return this.httpClient.post("http://localhost:3000/signup", signup)
  }
  select(){
    return this.httpClient.get('http://localhost:3000/signup')
    }
    update(signup:any){
      return this.httpClient.put(`http://localhost:3000/signup/${signup.id}`, signup)
    }
    delete(signup:any){
      return this.httpClient.delete(`http://localhost:3000/signup/${signup}`)
    }
    selectOne(signup:string){
     return this.httpClient.get(`http://localhost:3000/signup/${signup}`)
    }
}