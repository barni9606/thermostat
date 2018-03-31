import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DayComponent} from '../day.component';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-period',
  templateUrl: './new-period.component.html',
  styleUrls: ['./new-period.component.css', '../../../styles.css']
})
export class NewPeriodComponent implements OnInit {
  public pos = {'top': 0, 'height': 40};
  modalRef: BsModalRef;
  public startHour: number;
  public startMinute: number;
  public finishHour: number;
  public finishMinute: number;
  public temperature = 20;
  public parent: DayComponent;
  public newPeriodForm: FormGroup;

  constructor(private modalService: BsModalService) { }

  private static validator(min: number, max: number): ValidationErrors {
    return [
      Validators.required,
      Validators.min(min),
      Validators.max(max),
      Validators.minLength(1)
    ];
  }

  ngOnInit() {
    this.newPeriodForm = new FormGroup({
      'startHourValidator'    : new FormControl(this.startHour,    NewPeriodComponent.validator(0, 24)),
      'finishHourValidator'   : new FormControl(this.finishHour,   NewPeriodComponent.validator(0, 24)),
      'startMinuteValidator'  : new FormControl(this.startMinute,  NewPeriodComponent.validator(0, 60)),
      'finishMinuteValidator' : new FormControl(this.finishMinute, NewPeriodComponent.validator(0, 60)),
      'temperatureValidator'  : new FormControl(this.temperature,  NewPeriodComponent.validator(0, 40))
    });
  }

  setTop(top: number): void {
    this.pos.top = Math.round(top / 10) * 10;
  }

  setHeight(height: number): void {
    const calced = Math.round((height - this.pos.top) / 10) * 10;
    if (calced > 0) {
      this.pos.height = calced;
    }
  }

  openModal(template: TemplateRef<any>) {
    this.startHour = Math.floor(this.pos.top / 40);
    this.startMinute = Math.floor(this.pos.top / 40 * 60) % 60;
    this.finishHour = Math.floor((this.pos.height + this.pos.top) / 40);
    this.finishMinute = Math.floor((this.pos.height + this.pos.top) / 40 * 60) % 60;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    const a = this.startHour * 60 +  this.startMinute;
    const b = this.finishHour * 60 +  this.finishMinute;
    this.modalRef.hide();
    if (a <= 1440 && a >= 0 && b <= 1440 && b >= 0 &&
      this.startHour >= 0 && this.startHour <= 24 && this.startMinute >= 0 && this.startMinute < 60 &&
      this.finishHour >= 0 && this.finishHour <= 24 && this.finishMinute >= 0 && this.finishMinute < 60 &&
        b > a && this.temperature > 0 && this.temperature < 40 // TODO: 0?, 40?
    ) {
      this.parent.addNewPeriod(this.startHour, this.startMinute, this.finishHour, this.finishMinute, this.temperature);
    }
  }

  cancel(): void {
    this.modalRef.hide();
    this.parent.removeNewPeriod();
  }
}
