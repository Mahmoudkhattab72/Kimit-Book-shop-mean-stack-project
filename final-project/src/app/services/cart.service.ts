import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient:HttpClient) {}
   add(Book:any){
    return this.httpClient.post("http://localhost:3000/Book", Book)
  }
  select(){
    return this.httpClient.get('http://localhost:3000/Book')
    }
}
