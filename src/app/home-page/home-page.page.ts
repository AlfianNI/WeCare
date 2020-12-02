import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {

  constructor(
      private authSrv: AuthService,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authSrv.logoutUser()
        .then(res => {
          console.log(res);
          this.navCtrl.navigateBack('');
        }).catch(error => {
       console.log(error);
    });
  }

}
