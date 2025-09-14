import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-registration',
  imports: [MatInputModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  
  loginFormGroup = new FormGroup({
    loginEmailFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  loginPasswordFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),})
  
  signupFormGroup = new FormGroup({
    signupNameFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
    signupEmailFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  signupPasswordFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  signupCityFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),
  signupAddressFormControl: new FormControl('', [
    Validators.required,
    Validators.maxLength(100),
    Validators.minLength(5),
  ]),})

signup: any;
isEdit:boolean = false
submitOrUpdateBtnLabel = 'Sign Up'
constructor(private loginService:LoginService, private signupService:SignupService, private route:ActivatedRoute, private router:Router){}
ngOnInit(): void{
const signupId = this.route.snapshot.paramMap.get('id');
console.log('Signup ID: ', signupId);
if(signupId != null){
this.getData(signupId);
this.isEdit = true
this.submitOrUpdateBtnLabel = 'Update'
}
}
onSubmitOrUpdatesignup(){
    console.log('onSubmitOrUpdateItem');
    console.log(this.signupFormGroup.value);
    if (this.isEdit){
      this.signupService.update(this.signupFormGroup.value).subscribe((res: any) =>{
        console.log("update res ::", res);
        this.router.navigate(['/login-registration'])
      });
    }else{
      this.signupService.add(this.signupFormGroup.value).subscribe((res: any)=>{
      console.log('res ::', res);
       this.router.navigate(['/login-registration', this.signup.id])
    });}}

    getData(signupId:string){
    this.signupService.selectOne(signupId).subscribe((response:any) =>{
    this.signup = response;
    console.log('signup ::',this.signup);
    this.signupFormGroup.controls.signupEmailFormControl.setValue(
      this.signup.signupEmailFormControl
    );
    this.signupFormGroup.controls.signupPasswordFormControl.setValue(
      this.signup.signupPasswordFormControl
    );
    this.signupFormGroup.controls.signupNameFormControl.setValue(
      this.signup.signupNameFormControl
    );
     this.signupFormGroup.controls.signupAddressFormControl.setValue(
      this.signup.signupAddressFormControl
    );
    this.signupFormGroup.controls.signupCityFormControl.setValue(
      this.signup.signupCityFormControl
    );
   (this.signupFormGroup as FormGroup).addControl('id', new FormGroup(signupId));
    
});}
login: any;
onCreateLogin(): void {
    console.log('onCreateLogin');
    console.log(this.loginFormGroup.value);
    this.loginService.add(this.loginFormGroup.value).subscribe((res)=>{
      console.log('res ::', res);
    });}
    loginUser(loginEmailFormControl: string, loginPasswordFormControl: string): void {
    this.loginService.checkClient(loginEmailFormControl, loginPasswordFormControl).subscribe(
      (res) => {
        if (res.length > 0) {
          console.log('User found! Data:', res[0]);
        } else {
          console.log('Invalid credentials. No user found.');
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      });}
    }
  
