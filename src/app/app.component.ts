import { Component, OnInit } from '@angular/core';
import { CabinetMedicalService } from './cabinet-medical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private cabinetService: CabinetMedicalService) {

 }
  ngOnInit() {
    // this.cabinetService.login('Secretaire');
  }
}
