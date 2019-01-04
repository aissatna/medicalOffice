import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
// list of component
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { PatientComponent } from './patient/patient.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
