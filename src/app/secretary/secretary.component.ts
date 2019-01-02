import { CabinetMedicalService } from './../cabinet-medical.service';

import { CabinetInterface } from './../dataInterfaces/cabinet';

import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})

export class SecretaryComponent implements OnInit {
  private _cms: CabinetInterface;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService) {
    this.initCabinet(cabinetMedicalService);
  }

  ngOnInit() {
    this.cabinetMedicalService.getEmitPat()
      .subscribe(item => this.updateAjouter(item));

    this.cabinetMedicalService.getEmitAff()
      .subscribe(aff => this.updateAff(aff));

    this.cabinetMedicalService.getEmitDesaff()
      .subscribe(patdes => this.updateDesaff(patdes));
  }
  async initCabinet(cabinetMedicalService) {
    this._cms = await cabinetMedicalService.getData('/data/cabinetInfirmier.xml');
    console.log(this.cms);
  }
  // get adresse cabinet
  public get adresseCabinet() {
    return this._cms.adresse;
  }
  // get infirmiers
  public get infirmiers() {
    return this._cms.infirmiers;
  }
  // get patients Non Affectés
  public get patientsNonAfectes() {
    return this._cms.patientsNonAffectés;
  }

  updateAjouter(item) {
    this._cms.patientsNonAffectés.push(item);
  }

  updateAff(item) {
    console.log('affecter');
    this._cms.patientsNonAffectés =
      this._cms.patientsNonAffectés.filter(p => p.numéroSécuritéSociale !== item.p.numéroSécuritéSociale);

    this._cms.infirmiers[this._cms.infirmiers.findIndex(e => e.id === item.id)].patients.push(item.p);
    console.log(item.id);
  }

  updateDesaff(item) {
    console.log('desaffecter');
    const i = this._cms.infirmiers.findIndex(e => e.id === item.id);
    this._cms.infirmiers[i].patients = this._cms.infirmiers[i].patients.filter(e =>
      e.numéroSécuritéSociale !== item.p.numéroSécuritéSociale);
    this._cms.patientsNonAffectés.push(item.p);
  }


}
