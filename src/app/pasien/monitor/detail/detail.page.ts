import { Component, OnInit } from '@angular/core';
import {Pasien} from '../../../models/pasien.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PasienService} from '../../../services/pasien.service';
import {Dokter} from '../../../models/page-dokter.model';
import { Observable } from 'rxjs';
import { AlertController, ToastController } from '@ionic/angular';
import { DokterService } from 'src/app/services/dokter.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedPasien: Pasien;
  private fbPasien:Observable<Pasien>;
  loadedDokter:Dokter;
  suhu:number=0;
  constructor(
      private activatedRoute: ActivatedRoute,
      private pasienSrv: PasienService,
      private toastCtrl:ToastController,
      private router:Router,
      private dokterSrv:DokterService,
      private alertCtrl:AlertController
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe( paramMap => {
    //   if (!paramMap.has('pasienId')) { return; }
    //   const pasienId = paramMap.get('pasienId');
    //   this.pasienSrv.listaPasien(pasienId).subscribe(pasien=>{
    //     this.loadedPasien = pasien;
    //   })
    // });

    let id = this.activatedRoute.snapshot.paramMap.get('pasienId');
    if(id){
      this.pasienSrv.listaPasien(id).subscribe(pasien => {
        this.loadedPasien = pasien;
      })
    }
    this.dokterSrv.listaDokter(this.loadedPasien.nama_dokter).subscribe(dokter=>{
      this.loadedDokter = dokter;
    })
  }

  goToMonitor(){
    this.router.navigate(['/pasien/tab/monitor']);
  }

  async showToast(){
    const alert = await this.alertCtrl.create({
      header:'EMERGENCY',
      message:'Doctors Go to The Room'
      // ,
      // buttons:[{
      //   text:'Cancel',
      //   role:'cancel'
      // },{
      //   text:'Yes',
      //   handler: () => this.router.navigate(['/admin'])
      // }]
    });
    await alert.present();
  }

  emergency(){
    
    this.showToast();
  }

  ionViewWillEnter(){
    this.suhu = this.randomSuhu();
    this.pasienSrv.updateSuhu(this.loadedPasien,this.suhu);
  }

  randomSuhu() {
    return Math.floor(Math.random() * (39.3 - 36.1 + 1)) + 36.1;
  }

}
