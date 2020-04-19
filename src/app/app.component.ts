import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './shared/authentication-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  sideMenu() {
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Profile',
        url: '/profile',
        icon: 'person'
      },
      {
        title: 'Calendar',
        url: '/calendar',
        icon: 'calendar-outline'
      },
      {
        title: 'Add training',
        url: '/add-training',
        icon: 'add-circle-outline'
      },
      {
        title: 'Tracking',
        url: '/tracking',
        icon: 'analytics-outline'
      },
    ];
  }
  SignOut() {
    this.authService.SignOut()
      .then((res) => {
         {
          this.router.navigate(['login']);
        } 
      }).catch((error) => {
        window.alert(error.message);
      });
  }
}
