import { InfirmierInterface } from './../dataInterfaces/infirmier';
import { NotificationService } from './../services/notification.service';
import { CabinetMedicalService } from '../services/cabinet-medical.service';
import { CabinetInterface } from './../dataInterfaces/cabinet';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment'; // parsing the date with Moment.js


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})

export class SecretaryComponent implements OnInit {
  private _cms: CabinetInterface;
  public get cms(): CabinetInterface { return this._cms; }

  constructor(private cabinetMedicalService: CabinetMedicalService,
    private notificationService: NotificationService) {

    this.initCabinet(cabinetMedicalService);
  }
  form: FormGroup = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl(''),
    naissance: new FormControl('', Validators.required),
    numSecu: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
    sexe: new FormControl(''),
    etage: new FormControl(),
    numRue: new FormControl('', Validators.required),
    Rue: new FormControl('', Validators.required),
    CP: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    ville: new FormControl(''),
  });

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
  public get adresseNumRue() {
    return this._cms.adresse.numéro;
  }
  public get adresseRue() {
    return this._cms.adresse.rue;
  }
  public get adresseVille() {
    return this._cms.adresse.ville;
  }
  public get adresseCP() {
    return this._cms.adresse.codePostal;
  }
  public get adresseEtage() {
    return this._cms.adresse.étage;
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
    this._cms.patientsNonAffectés =
      this._cms.patientsNonAffectés.filter(p => p.numéroSécuritéSociale !== item.p.numéroSécuritéSociale);
    this._cms.infirmiers[this._cms.infirmiers.findIndex(e => e.id === item.id)].patients.push(item.p);

  }

  updateDesaff(item) {
    const i = this._cms.infirmiers.findIndex(e => e.id === item.id);
    this._cms.infirmiers[i].patients = this._cms.infirmiers[i].patients.filter(e =>
      e.numéroSécuritéSociale !== item.p.numéroSécuritéSociale);
    this._cms.patientsNonAffectés.push(item.p);
  }
  serviceClear() {
    this.form.reset();
    this.form.setValue({
      nom: '',
      prenom: '',
      naissance: '',
      numSecu: '',
      sexe: '',
      etage: '',
      numRue: '',
      Rue: '',
      CP: '',
      ville: '',
    });
  }
  serviceAjouter(nom: string, prenom: string,
    numSec: string, sexe: string, date: string,
    etage: string, numero: string, rue: string,
    codePostal: number, ville: string) {
    // parsing the date to format YYYY-MM-DD
    const momentDate = new Date(date); // Replace event.value with your date value
    const dateXML = moment(momentDate).format('YYYY-MM-DD');

    this.cabinetMedicalService.ajouter_patient(nom, prenom,
      numSec, sexe, dateXML,
      etage, numero, rue,
      codePostal, ville);
    this.notificationService.successService(':: Submitted successfully');
    this.serviceClear();
  }


}
