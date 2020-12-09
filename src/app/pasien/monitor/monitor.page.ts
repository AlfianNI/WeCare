import { Component, OnInit } from '@angular/core';
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
  constructor(private pasiensSrv: PasienService) { }

  ngOnInit() {
    this.fbPasien = this.pasiensSrv.listPasien();
    this.pasiens = this.pasiensSrv.getAllPasiens();
  }

}
