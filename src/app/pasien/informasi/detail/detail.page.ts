import { Component, OnInit } from '@angular/core';
import {Pasien} from '../../../models/pasien.model';
import {ActivatedRoute} from '@angular/router';
import {PasienService} from '../../../services/pasien.service';
import { Observable } from 'rxjs';
import { Dokter } from 'src/app/models/page-dokter.model';
import { DokterService } from 'src/app/services/dokter.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  loadedPasien: Pasien;
  loadedDokter: Dokter;
  constructor(
      private activatedRoute: ActivatedRoute,
      private pasienSrv: PasienService,
      private dokterSrv:DokterService
  ) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe( paramMap => {
    //   if (!paramMap.has('pasienId')) { return; }
    //   const pasienId = paramMap.get('pasienId');
    //   this.loadedPasien = this.pasienSrv.getPasien(pasienId);
    // });

    let id = this.activatedRoute.snapshot.paramMap.get('pasienId');
    if(id){
      this.pasienSrv.listaPasien(id).subscribe(pasien => {
        this.loadedPasien = pasien;
      });

    }
  }
}
