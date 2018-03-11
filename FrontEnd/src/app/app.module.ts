import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DayComponent } from './week/day/day.component';
import { PeriodComponent } from './week/day/period/period.component';
import { NewPeriodDirective } from './week/day/new-period/new-period.directive';
import { NewPeriodComponent } from './week/day/new-period/new-period.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    DayComponent,
    PeriodComponent,
    NewPeriodDirective,
    NewPeriodComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewPeriodComponent]
})
export class AppModule { }
