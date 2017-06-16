import { Component } from '@angular/core';
import {GetDataService} from  './services/getData.service' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GetDataService]
})
export class AppComponent {
  title = 'app';
  name:String;
  email:String;
  posts:Post[];

  constructor(private getData:GetDataService){
  this.getData.getPostData().subscribe( posts=>{
        console.log(posts);
        this.posts = posts.data;
    });
    this.name='naveen';
    this.email='naveen@gmail.com';
  } 

}

interface Post{
    _id:string,
    firstname:string,
    lastname:string,
    emailid:string,
    phone:number,
    state:string,
    country:string
}

