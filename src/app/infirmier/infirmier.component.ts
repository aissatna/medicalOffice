import { CabinetMedicalService } from './../cabinet-medical.service';
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
  getNom() {
    return this.infirmier.nom;
  }
  getPrenom() {
    return this.infirmier.prénom;
  }
  getPhotoURL() {
    return 'data/' + this.infirmier.photo;
  }
  getId() {
    return this.infirmier.id;
  }
  getAdresse() {
    return this.infirmier.adresse.numéro + ' '
      + this.infirmier.adresse.rue + ' '
      + this.infirmier.adresse.ville + ' '
      + this.infirmier.adresse.codePostal + ', étage :' + ' '
      + this.infirmier.adresse.étage;

  }
  getPatients() {
    return this.infirmier.patients;
  }
  getPatientInfo(patient: PatientInterface) {
    return patient.prénom + ' ' + patient.nom.toLocaleUpperCase();
  }
  service_desaffecter(pat: PatientInterface) {
    this.cabinetMedicalService.desaffecter_patient(pat, this.infirmier.id);
}

}
