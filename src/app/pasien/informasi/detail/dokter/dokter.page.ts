import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dokter } from 'src/app/models/page-dokter.model';
import { Pasien } from 'src/app/models/pasien.model';
import { DokterService } from 'src/app/services/dokter.service';
import { PasienService } from 'src/app/services/pasien.service';

@Component({
  selector: 'app-dokter',
  templateUrl: './dokter.page.html',
  styleUrls: ['./dokter.page.scss'],
})
export class DokterPage implements OnInit {
  loadedDokter:Dokter;
  private fbPasien:Observable<Pasien[]>;
  constructor(private activatedRoute: ActivatedRoute, 
    private dokterSrv:DokterService,private pasiensSrv:PasienService, private router:Router) { }

  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('dokterId');
    if(id){
      this.dokterSrv.listaDokter(id).subscribe(dokter => {
        this.loadedDokter = dokter;
        this.fbPasien = this.pasiensSrv.listPasien();
      });

    }
  }

  goToDetail(id:string){
    this.router.navigate(['./',id]);
  }

}
