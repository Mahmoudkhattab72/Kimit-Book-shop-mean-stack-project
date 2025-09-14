import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';
@Component({
  selector: 'app-contact',
  imports: [MatInputModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
public email = 'my-email@yoursite.com';
contactFormGroup = new FormGroup({
    contactNameFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
    contactEmailFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  contactSubjectFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  contactDepartmentControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  contactQuestionFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(2000),
    Validators.minLength(5),
  ]),})
  constructor(private ContactService:ContactService, private route:ActivatedRoute, private router:Router){}
  onCreateLogin(): void {
    console.log('onCreateLogin');
    console.log(this.contactFormGroup.value);
    this.ContactService.add(this.contactFormGroup.value).subscribe((res)=>{
      console.log('res ::', res);
    });}
    
}
