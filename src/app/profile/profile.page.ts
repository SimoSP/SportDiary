import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AuthenticationService } from './../shared/authentication-service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData = [];
  constructor(private trService: AuthenticationService) { }


  // Getting user email address from firebase
  // This could be used to pull different things from user like name/lastname and age to profile page.
  ngOnInit() {
    this.userData = [];
    let userData = this.trService.Getuserdata();
      this.userData.push(userData)
  }
  
    
  }


