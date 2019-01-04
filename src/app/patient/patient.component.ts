import { CabinetMedicalService } from '../services/cabinet-medical.service';
import { Adresse } from './../dataInterfaces/adresse';
import { PatientInterface } from './../dataInterfaces/patient';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Input() patient: PatientInterface;
  @Input() infirmiers;
  constructor(private cabinetService: CabinetMedicalService) { }

  public get Nom() {
    return this.patient.nom;
  }
  public get Prenom() {
    return this.patient.prénom;
  }
  public get Sexe() {
    return this.patient.sexe;
  }
  public get NumSecu() {
    return this.patient.numéroSécuritéSociale;
  }
  public get Adresse() {
    return this.patient.adresse.numéro + ' '
      + this.patient.adresse.rue + ' '
      + this.patient.adresse.ville + ' '
      + this.patient.adresse.codePostal + ', étage :' + ' '
      + this.patient.adresse.étage;
  }
  public get Naissance() {
    return this.patient.naissance;
  }
  ngOnInit() {
  }
  service_affecter(id: string) {
    this.cabinetService.affecter_patient(id, this.patient);
  }

}
