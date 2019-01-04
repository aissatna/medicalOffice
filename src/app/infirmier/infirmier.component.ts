import { CabinetMedicalService } from '../services/cabinet-medical.service';
import { InfirmierInterface } from './../dataInterfaces/infirmier';
import { Component, OnInit, Input } from '@angular/core';
import { PatientInterface } from '../dataInterfaces/patient';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {
  @Input() infirmier: InfirmierInterface;
  constructor(private cabinetMedicalService: CabinetMedicalService) { }

  ngOnInit() {
  }
  public get Nom() {
    return this.infirmier.nom;
  }
  public get Prenom() {
    return this.infirmier.prénom;
  }
  public get PhotoURL() {
    return 'data/' + this.infirmier.photo;
  }
  public get Id() {
    return this.infirmier.id;
  }
  public get Adresse() {
    return this.infirmier.adresse.numéro + ' '
      + this.infirmier.adresse.rue + ' '
      + this.infirmier.adresse.ville + ' '
      + this.infirmier.adresse.codePostal + ', étage :' + ' '
      + this.infirmier.adresse.étage;

  }
  public get Patients() {
    return this.infirmier.patients;
  }
  getPatientInfo(patient: PatientInterface) {
    return patient.prénom + ' ' + patient.nom.toLocaleUpperCase();
  }
  service_desaffecter(pat: PatientInterface) {
    this.cabinetMedicalService.desaffecter_patient(pat, this.infirmier.id);
}

}
