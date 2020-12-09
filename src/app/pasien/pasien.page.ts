import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Pasien} from '../models/pasien.model';
import {PasienService} from '../services/pasien.service';

@Component({
  selector: 'app-pasien',
  templateUrl: './pasien.page.html',
  styleUrls: ['./pasien.page.scss'],
})
export class PasienPage implements OnInit {
  pasiens: Pasien[];
  private fbPasien:Observable<Pasien[]>;
  constructor(private pasiensSrv: PasienService) { }

  ngOnInit() {
    this.fbPasien = this.pasiensSrv.listPasien();
    this.pasiens = this.pasiensSrv.getAllPasiens();
  }

}
