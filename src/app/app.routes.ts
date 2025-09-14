import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { ContactComponent } from './components/contact/contact.component';
import { LoginRegistrationComponent } from './components/login-registration/login-registration.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'books',component:BooksComponent},
    {path:'add-book',component:AddBookComponent},
    {path:'collections',component:CollectionsComponent},
    {path:'Horror',component:CategoriesComponent},
    {path:'contact',component:ContactComponent},
    {path:'login-registration',component:LoginRegistrationComponent},
    {path:'registration',component:RegistrationComponent},
    {path:'update-data/:id',component:RegistrationComponent},
    {path:'update-Book/:id',component:AddBookComponent},
    {path:'about-us',component:AboutUsComponent},
    {path:'cart',component:CartComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


