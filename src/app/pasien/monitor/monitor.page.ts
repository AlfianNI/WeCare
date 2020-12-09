import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Pasien} from '../../models/pasien.model';
import {PasienService} from '../../services/pasien.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {
  pasiens: Pasien[];
  private fbPasien:Observable<Pasien[]>;
  constructor(private pasiensSrv: PasienService, private router:Router) { }

  ngOnInit() {
    this.fbPasien = this.pasiensSrv.listPasien();
    this.pasiens = this.pasiensSrv.getAllPasiens();
  }

  goToDetail(id:string){
    this.router.navigate(['./',id]);
  }

}
