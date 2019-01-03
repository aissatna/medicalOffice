
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

// Cabinet imports
import { CabinetInterface } from './dataInterfaces/cabinet';
import { InfirmierInterface } from './dataInterfaces/infirmier';
import { PatientInterface } from './dataInterfaces/patient';
import { Adresse } from './dataInterfaces/adresse';
import { sexeEnum } from './dataInterfaces/sexe';
@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {
  update_pat = new EventEmitter<any>();
  update_aff = new EventEmitter<any>();
  update_desaff = new EventEmitter<any>();
  constructor(private _http: HttpClient) { }
  // get Data from the server
  async getData(url: string): Promise<CabinetInterface> {
    try {
      const res: HttpResponse<string> = await this._http.get(url, { observe: 'response', responseType: 'text' }).toPromise();
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.body, 'text/xml');
      // default cabinet
      const cabinet: CabinetInterface = {
        infirmiers: [],
        patientsNonAffectés: [],
        adresse: this.getAdressFrom(doc.querySelector('cabinet')),
      };
      // Get list of infermiers
      const infirmiersFromXML = Array.from(doc.querySelectorAll('infirmiers > infirmier'));
      cabinet.infirmiers = infirmiersFromXML.map(
        infXML => ({
          id: infXML.getAttribute('id'),
          prénom: infXML.querySelector('prénom').textContent,
          nom: infXML.querySelector('nom').textContent,
          photo: infXML.querySelector('photo').textContent,
          patients: [],
          adresse: this.getAdressFrom(infXML),

        })
      );
      // Get list of patients
      const patientsFromXML = Array.from(doc.querySelectorAll('patients > patient'));
      const patients: PatientInterface[] = patientsFromXML.map(
        patXML => ({
          prénom: patXML.querySelector('prénom').textContent,
          nom: patXML.querySelector('nom').textContent,
          sexe: patXML.querySelector('sexe').textContent === 'M' ? sexeEnum.M : sexeEnum.F,
          naissance: patXML.querySelector('naissance').textContent,
          numéroSécuritéSociale: patXML.querySelector('numéro').textContent,
          adresse: this.getAdressFrom(patXML),
        })
      );
      // crier un tableau de couple <infirmier,patient>
      const affectations = patientsFromXML.map(
        (patXML, i) => {
          const visiteXML = patXML.querySelector('visite[intervenant]');
          let infirmier: InfirmierInterface = null;
          if (visiteXML != null) {
            infirmier = cabinet.infirmiers.find(inf =>
              inf.id === visiteXML.getAttribute('intervenant'));
          }
          return { patient: patients[i], infirmier: infirmier };

        });
      // Affectation des patients
      affectations.forEach(({ patient: P, infirmier: I }) => {
        (I != null) ? I.patients.push(P) : cabinet.patientsNonAffectés.push(P);
      });
      return cabinet;
    } catch (err) {
      console.error('ERROR in getData', err);
    }

  }
  // Get adresse from html Element
  getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville: (node = root.querySelector('adresse > ville')) ? node.textContent : '',
      codePostal: (node = root.querySelector('adresse > codePostal')) ? parseInt(node.textContent, 10) : 0,
      rue: (node = root.querySelector('adresse > ville')) ? node.textContent : '',
      numéro: (node = root.querySelector('adresse > numéro')) ? node.textContent : '',
      étage: (node = root.querySelector('adresse > étage')) ? node.textContent : '',
    };
  }
  // get patients change (Affecter, Désaffecte , Ajouter)
  getEmitPat() {
    return this.update_pat;
  }
  getEmitAff() {
    return this.update_aff;
  }
  getEmitDesaff() {
    return this.update_desaff;
  }
  // affectation methode
  async affecter_patient(id: string, pat: PatientInterface) {
    await this._http.post('/affectation', {
      infirmier: id,
      patient: pat.numéroSécuritéSociale
    }, { observe: 'response' }).subscribe(response => { if (response.ok) { this.update_aff.emit({ p: pat, id: id }); } });
  }
  // desaffectation methode
  async desaffecter_patient(pat: PatientInterface, id) {
    await this._http.post('/affectation', {
      infirmier: 'none',
      patient: pat.numéroSécuritéSociale
    }, { observe: 'response' }).subscribe(response => { if (response.ok) { this.update_desaff.emit({ p: pat, id: id }); } });

  }

  // Ajouter un patient
  ajouter_patient(
    nom: string,
    prenom: string,
    numSec: string,
    sexe: string,
    date: string,
    etage: string,
    numero: string,
    rue: string,
    codePostal: number,
    ville: string) {
    const currentAdresse: Adresse = {
      étage: etage,
      numéro: numero,
      rue: rue,
      codePostal: codePostal,
      ville: ville,
    };

    const current_pat: PatientInterface = {
      prénom: prenom,
      nom: nom,
      sexe: sexe === 'M' ? sexeEnum.M : sexeEnum.F,
      naissance: date,
      numéroSécuritéSociale: numSec,
      adresse: currentAdresse
    };
    this._http.post('/addPatient', {
      patientName: nom,
      patientForname: prenom,
      patientNumber: numSec,
      patientSex: sexe === 'M' ? sexeEnum.M : sexeEnum.F,
      patientBirthday: date,
      patientFloor: etage,
      patientStreetNumber: numero,
      patientStreet: rue,
      patientPostalCode: codePostal,
      patientCity: ville
    }, { observe: 'response' }).subscribe(response => { if (response.ok) { this.update_pat.emit(current_pat); 
    console.log('patient ajouter,response ==> ', response.status); } });

  }
}


