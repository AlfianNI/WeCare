import { Component, OnInit } from '@angular/core';
import {Pasien} from '../../models/pasien.model';
import {PasienService} from '../../services/pasien.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss'],
})
export class MonitorPage implements OnInit {
  pasiens: Pasien[];
  constructor(private pasienSrv: PasienService) { }

  ngOnInit() {
    this.pasiens = this.pasienSrv.getAllPasiens();
  }

}
