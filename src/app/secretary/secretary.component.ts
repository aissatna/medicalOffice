import { CabinetInterface } from './../dataInterfaces/cabinet';
import { CabinetMedicalService } from '../cabinet-medical.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
  private _cms: CabinetInterface;
  servers = ['serverTest' , 'serverTest2'] ;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(cabinetMedicalService: CabinetMedicalService) {
     this.initCabinet(cabinetMedicalService);
  }

  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this.cms);
  }
  // get adresse cabinet
  public get adresseCabinet () {
    return this._cms.adresse;
  }
  // get infirmier from cabinet


  ngOnInit() {

  }

}
