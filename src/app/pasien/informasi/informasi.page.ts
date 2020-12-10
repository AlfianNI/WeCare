import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Pasien} from '../../models/pasien.model';
import {PasienService} from '../../services/pasien.service';


@Component({
  selector: 'app-informasi',
  templateUrl: './informasi.page.html',
  styleUrls: ['./informasi.page.scss'],
})
export class InformasiPage implements OnInit {
  pasiens: Pasien[];
  private fbPasien:Observable<Pasien[]>;
  constructor(private pasiensSrv: PasienService) { }

  ngOnInit() {
    this.fbPasien = this.pasiensSrv.listPasien();
    this.pasiens = this.pasiensSrv.getAllPasiens();
  }

}
