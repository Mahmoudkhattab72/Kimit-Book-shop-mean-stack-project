import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient:HttpClient) {}
   add(Book:any){
    return this.httpClient.post("http://localhost:3000/Book", Book)
  }
  select(){
    return this.httpClient.get('http://localhost:3000/Book')
    }
    update(Book:any){
      return this.httpClient.put(`http://localhost:3000/Book/${Book.id}`, Book)
    }
    delete(Book:any){
      return this.httpClient.delete(`http://localhost:3000/Book/${Book}`)
    }
    selectOne(Book:string){
     return this.httpClient.get(`http://localhost:3000/Book/${Book}`)
    }
}
