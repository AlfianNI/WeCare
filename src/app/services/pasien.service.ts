import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {Pasien} from '../models/pasien.model';
import {map,take} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasienService {
  private pasiens: Pasien[] = [
    {
      id_pasien: 'p001',
      nama_pasien: 'Top Markotop',
      ruangan_perawatan: '102',
      no_bpjs_pasien: '',
      imageUrl: 'https://cdn.zmescience.com/wp-content/uploads/2018/05/169764_web.jpg',
      tempat_lahir: 'Balikpapan',
      tanggal_lahir: '30 Januari 1986',
      nama_dokter: 'd003',
      suhu_badan: Math.floor(Math.random()*38.5) + 35.5
    },
    {
      id_pasien: 'p002',
      nama_pasien: 'Susi Silimikiti',
      ruangan_perawatan: '104',
      no_bpjs_pasien: '110110110',
      imageUrl: 'https://media.buzzle.com/media/images-en/gallery/human-expressions/1200-156820425-fair-woman.jpg',
      tempat_lahir: 'Kupang',
      tanggal_lahir: '17 September 1990',
      nama_dokter: 'Sulaiman',
      suhu_badan: Math.floor(Math.random()*38.5) + 35.5
    },
    {
      id_pasien: 'p003',
      nama_pasien: 'Bambang Pratama',
      ruangan_perawatan: '112',
      no_bpjs_pasien: '123432141',
      imageUrl: 'https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/sozialewahrnehmung/m29_30_gr.jpg',
      tempat_lahir: 'Medan',
      tanggal_lahir: '05 Juni 1992',
      nama_dokter: 'Kristianto',
      suhu_badan : Math.floor(Math.random()*38.5) + 35.5
    }
  ];

  private pasienCollect:AngularFirestoreCollection<Pasien>;
  private fsPasien:Observable<Pasien[]>;
  constructor(private afs:AngularFirestore) { 
    this.pasienCollect = this.afs.collection<Pasien>('pasien');
    this.fsPasien = this.pasienCollect.snapshotChanges().pipe(
      map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return {id,...data};
          });
      })
  );

  }

  listPasien(): Observable<Pasien[]> {
    return this.fsPasien;
  }


  listaPasien(id: string): Observable<Pasien> {
    return this.pasienCollect.doc<Pasien>(id).valueChanges().pipe(
      take(1),
      map(pasien=>{
        pasien.id = id;
        return pasien;
      })
    ) 
}

updateSuhu(pasien:Pasien,suhu:number): Promise<void>{
  return this.pasienCollect.doc(pasien.id).update({suhu_badan:suhu});
}





  getAllPasiens(){
    return [...this.pasiens];
  }

  getPasien(pasienId: string) {
    return {...this.pasiens.find( pasien => {
      return pasien.id_pasien === pasienId;
    })};
  }

}
