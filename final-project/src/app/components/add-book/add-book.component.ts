import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  imports: [MatInputModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent implements OnInit{
    bookFormGroup= new FormGroup({
    bookImageFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(1),
  ]),
  bookNameFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(1),
  ]),
  bookCategoryFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(1),
  ]),
  bookPriceFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(1),
  ]),})

  
  Book: any;
  isEdit:boolean = false
  submitOrUpdateBtnLabel = 'Add Book'
  constructor(private BookService:BookService, private route:ActivatedRoute, private router:Router){}
  ngOnInit(): void{
  const BookId = this.route.snapshot.paramMap.get('id');
  console.log('Book ID: ', BookId);
  if(BookId != null){
  this.getData(BookId);
  this.isEdit = true
  this.submitOrUpdateBtnLabel = 'Update'
  }
  }
  onSubmitOrUpdateSignup(){
    console.log('onSubmitOrUpdateSignup');
    console.log(this.bookFormGroup.value);
    if (this.isEdit){
      this.BookService.update(this.bookFormGroup.value).subscribe((res: any) =>{
        console.log("update res ::", res);
        this.router.navigate(['/book'])
      });
    }else{
      this.BookService.add(this.bookFormGroup.value).subscribe((res: any)=>{
      console.log('res ::', res);
       this.router.navigate(['/book', this.Book.id])
    });}}

    getData(BookId:string){
    this.BookService.selectOne(BookId).subscribe((response:any) =>{
    this.Book = response;
    console.log('book ::',this.Book);
    this.bookFormGroup.controls.bookImageFormControl.setValue(
      this.Book.bookImageFormControl
    );
    this.bookFormGroup.controls.bookNameFormControl.setValue(
      this.Book.bookNameFormControl
    );
     this.bookFormGroup.controls.bookCategoryFormControl.setValue(
      this.Book.bookCategoryFormControl
    );
    this.bookFormGroup.controls.bookPriceFormControl.setValue(
      this.Book.bookPriceFormControl
    );
   (this.bookFormGroup as FormGroup).addControl('id', new FormGroup(BookId));
    
});}
}
