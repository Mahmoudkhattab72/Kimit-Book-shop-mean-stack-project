import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{
Book: any;
cart: any;
addToCart= 'Add to cart'
constructor(private BookService:BookService, private CartService:CartService, private router:Router,  private route:ActivatedRoute,){
    
  }
  
  ngOnInit(): void{
    this.getData()
  }
  getData(){
    this.BookService.select().subscribe((res: any) =>{
      console.log('res ::', res);
      this.Book= res
    });
  }
  onUpdateData(Book:any, B:number){
    this.router.navigate(['/update-Book', Book.id])
  }
  onDeleteData(Book:any, B:number){
    console.log(Book);
    console.log(B);
    this.BookService.delete(Book.id).subscribe(res =>{
      console.log(res);
      this.getData()
    })
  }
    onAddToCart(): void {
    console.log('onAddToCart');
    console.log(this.Book);
    this.CartService.add(this.Book.value).subscribe((res)=>{
      console.log('res ::', res);
    });}
}
