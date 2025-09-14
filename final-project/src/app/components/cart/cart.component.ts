import { Component} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Book: any;
  
  constructor(private CartService:CartService, private router:Router,  private route:ActivatedRoute,){}
    ngOnInit(): void{
    this.getData()
  }
  getData(){
    this.CartService.select().subscribe((res: any) =>{
      console.log('res ::', res);
      this.Book= res
    });
  }
}

