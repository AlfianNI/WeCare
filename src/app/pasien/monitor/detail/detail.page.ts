import { Component, OnInit } from '@angular/core';
import {Pasien} from '../../../models/pasien.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PasienService} from '../../../services/pasien.service';
import {Dokter} from '../../../models/page-dokter.model';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
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
  constructor(
      private activatedRoute: ActivatedRoute,
      private pasienSrv: PasienService,
      private toastCtrl:ToastController,
      private router:Router,
      private dokterSrv:DokterService
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

  showToast(msg){
    this.toastCtrl.create({
      message:msg,
      duration:3000
    }).then(toast=>toast.present());
  }

  emergency(){
    this.showToast(['Calling Doctor ',this.loadedDokter.nama_dokter,' to Room ',this.loadedPasien.ruangan_perawatan])
  }

}
