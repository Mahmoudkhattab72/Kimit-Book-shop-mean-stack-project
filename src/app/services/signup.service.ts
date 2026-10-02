import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private httpClient: HttpClient) {}

  // Sends the signup form to the Express backend.
  // The backend expects: name, email, password, city, address.
  add(signup: any) {
    return this.httpClient.post('http://localhost:3000/client/signup', {
      name: signup.signupNameFormControl,
      email: signup.signupEmailFormControl,
      password: signup.signupPasswordFormControl,
      city: signup.signupCityFormControl,
      address: signup.signupAddressFormControl,
    });
  }

  // The methods below still use the old json-server URLs.
  // They are not connected to the new backend yet.
  select() {
    return this.httpClient.get('http://localhost:3000/signup');
  }

  update(signup: any) {
    return this.httpClient.put(`http://localhost:3000/signup/${signup.id}`, signup);
  }

  delete(signup: any) {
    return this.httpClient.delete(`http://localhost:3000/signup/${signup}`);
  }

  selectOne(signup: string) {
    return this.httpClient.get(`http://localhost:3000/signup/${signup}`);
  }
}