import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name:String;
  emailId:String;
  constructor() { 

    this.name='naveen';
    this.emailId="naveen@gmail.com"

  }

  ngOnInit() {

    
  }

}
