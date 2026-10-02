import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login-registration',
  imports: [],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})
export class LoginRegistrationComponent implements  OnInit{
  signup: any;
  login: any;
  constructor(private SignupService:SignupService, private router:Router, private LoginService:LoginService){
    
  }
  ngOnInit(): void{
    this.getData()
    this.checkData()
  }
  getData(){
    this.SignupService.select().subscribe((res: any) =>{
      console.log('res ::', res);
      this.signup= res
    });
  }
  onUpdateData(signup:any, s:number){
    this.router.navigate(['/update-data', signup.id])
  }
  onDeleteData(signup:any, s:number){
    console.log(signup);
    console.log(s);
    this.SignupService.delete(signup.id).subscribe(res =>{
      console.log(res);
      this.getData()
    })
  }
  checkData(): void {
    this.LoginService.getData().subscribe(
      (res: any) => {
        this.login = res;
        console.log('Data fetched successfully:', this.login);
      },
      (error:any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

  