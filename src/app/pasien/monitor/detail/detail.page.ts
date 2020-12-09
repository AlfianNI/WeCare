import { Component, OnInit } from '@angular/core';
import {Pasien} from '../../../models/pasien.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PasienService} from '../../../services/pasien.service';
import {Dokter} from '../../../models/page-dokter.model';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedPasien: Pasien;
  private fbPasien:Observable<Pasien>;
  constructor(
      private activatedRoute: ActivatedRoute,
      private pasienSrv: PasienService,
      private toastCtrl:ToastController,
      private router:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      if (!paramMap.has('pasienId')) { return; }
      const pasienId = paramMap.get('pasienId');
      this.pasienSrv.listaPasien(pasienId).subscribe(pasien=>{
        this.loadedPasien = pasien;
      })
    });
  }

  goToMonitor(){
    this.router.navigate(['/pasien/tab/monitor']);
  }

}
