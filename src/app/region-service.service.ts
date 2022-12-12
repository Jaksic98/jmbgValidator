import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegionServiceService {
  constructor() {}

  regions = [
    { id: 1, name: 'stranci u BiH' },
    { id: 2, name: 'stranci u Crnoj Gori' },
    { id: 3, name: 'stranci u Hrvatskoj' },
    { id: 4, name: 'stranci u Makedoniji' },
    { id: 5, name: 'stranci u Sloveniji' },
    { id: 7, name: 'stranci u Srbiji (bez pokrajina)' },
    { id: 8, name: 'stranci u Vojvodini' },
    { id: 9, name: 'stranci na Kosovu i Metohiji' },
    { id: 10, name: 'Banja Luka' },
    { id: 11, name: 'Bihać' },
    { id: 12, name: 'Doboj' },
    { id: 13, name: 'Goražde' },
    { id: 14, name: 'Livno' },
    { id: 15, name: 'Mostar' },
    { id: 16, name: 'Prijedor' },
    { id: 17, name: 'Sarajevo' },
    { id: 18, name: 'Tuzla' },
    { id: 19, name: 'Zenica' },
    { id: 21, name: 'Podgorica' },
    { id: 26, name: 'Nikšić' },
    { id: 29, name: 'Pljevlja' },
    { id: 30, name: 'Osijek, Slavonija region' },
    {
      id: 31,
      name: 'Bjelovar, Virovitica, Koprivnica, Pakrac, Podravina region',
    },
    { id: 32, name: 'Varaždin, Međumurje region' },
    { id: 33, name: 'Zagreb' },
    { id: 34, name: 'Karlovac' },
    { id: 35, name: 'Gospić, Lika region' },
    { id: 36, name: 'Rijeka, Pula, Istra and Primorje region' },
    { id: 37, name: 'Sisak, Banovina region' },
    { id: 38, name: 'Split, Zadar, Dubrovnik, Dalmacija region' },
    { id: 39, name: 'ostalo' },
    { id: 41, name: 'Bitola' },
    { id: 42, name: 'Kumanovo' },
    { id: 43, name: 'Ohrid' },
    { id: 44, name: 'Prilep' },
    { id: 45, name: 'Skopje' },
    { id: 46, name: 'Strumica' },
    { id: 47, name: 'Tetovo' },
    { id: 48, name: 'Veles' },
    { id: 49, name: 'Štip' },
    { id: 50, name: 'Slovenija' },
    { id: 71, name: 'Beograd region' },
    { id: 72, name: 'Šumadija' },
    { id: 73, name: 'Niš' },
    { id: 74, name: 'Južna Morava' },
    { id: 75, name: 'Zaječar' },
    { id: 76, name: 'Podunavlje' },
    { id: 77, name: 'Podrinje i Kolubara' },
    { id: 78, name: 'Kraljevo' },
    { id: 79, name: 'Užice' },
    { id: 80, name: 'Novi Sad' },
    { id: 81, name: 'Sombor' },
    { id: 82, name: 'Subotica' },
    { id: 85, name: 'Zrenjanin' },
    { id: 86, name: 'Pančevo' },
    { id: 87, name: 'Kikinda' },
    { id: 88, name: 'Ruma' },
    { id: 89, name: 'Sremska Mitrovica' },
    { id: 91, name: 'Priština' },
    { id: 92, name: 'Kosovska Mitrovica' },
    { id: 93, name: 'Peć' },
    { id: 94, name: 'Đakovica' },
    { id: 95, name: 'Prizren' },
    { id: 96, name: 'Kosovsko Pomoravski okrug' },
  ];

  getRegions(): Array<any> {
    return this.regions;
  }
}
