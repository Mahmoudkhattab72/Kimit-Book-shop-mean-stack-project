import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient:HttpClient) {}
  add(contact:any){
    return this.httpClient.post("http://localhost:3000/contact", contact)
  }
  select(){
    return this.httpClient.get('http://localhost:3000/contact')
    }

}
