import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient:HttpClient) {}
  add(login:any){
    return this.httpClient.post("http://localhost:3000/login", login)
  }
  getData(){
    return this.httpClient.get('http://localhost:3000/login')
    }
    checkClient(email: string, password: string): Observable<any> {
    let login = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.httpClient.get("http://localhost:3000/login")
  }
}
