import {
  Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Day} from '../../data/Day';
import {Period} from '../../data/Period';
import {Time} from '../../data/Time';
import {NewPeriodDirective} from './new-period/new-period.directive';
import {NewPeriodComponent} from './new-period/new-period.component';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css',  '../../styles.css']
})
export class DayComponent implements OnInit {

  @Input() dayNumber: number;
  @Input() public day: Day;

  private flag = false;
  @ViewChild(NewPeriodDirective) newPeriodHost: NewPeriodDirective;
  private componentFactory: ComponentFactory<NewPeriodComponent>;
  private viewContainerRef: ViewContainerRef;
  private componentRef: ComponentRef<NewPeriodComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 24);
      const b = a + Math.floor(Math.random() * (24 - a));
      const t = Math.floor(Math.random() * 10) + 15;
      this.day.addPeriod(new Period(new Time(a, a), new Time(b, b), t));
    }
  }

  onMouseDown(event): void {
    event.preventDefault();
    if (!this.flag) {
      const target = event.target || event.srcElement;
      if (target.className === 'day') {
        if (this.viewContainerRef && this.viewContainerRef.get(0)) {
          this.viewContainerRef.get(0).destroy();
        } else {

          const offset = target.getClientRects().item(0);

          this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewPeriodComponent);
          this.viewContainerRef = this.newPeriodHost.viewContainerRef;
          this.viewContainerRef.clear();
          this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);
          const instance = <NewPeriodComponent>this.componentRef.instance;
          instance.parent = this;
          instance.setTop(event.clientY - offset.top);
          this.flag = true;
        }
      }
      if (target.parentElement.parentElement.className === 'day' && target.className !== 'new-period') {
        if (this.viewContainerRef && this.viewContainerRef.get(0)) {
          this.viewContainerRef.get(0).destroy();
        }
      }
    }
  }

  onMouseMove(event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.flag) {
      const target = event.target || event.srcElement;
      if (target.className === 'day') {
        const offset = target.getClientRects().item(0);
        const newPeriod = (<NewPeriodComponent>this.componentRef.instance);
        newPeriod.setHeight(event.clientY - offset.top);
      } else if (target.parentElement.parentElement.className === 'day') {
        const offset = target.parentElement.parentElement.getClientRects().item(0);
        const newPeriod = (<NewPeriodComponent>this.componentRef.instance);
        newPeriod.setHeight(event.clientY - offset.top);
      }
    }
  }

  onMouseUp(event): void {
    event.preventDefault();
    this.flag = false;
  }

  onMouseOut(event): void {
    event.preventDefault();
    this.flag = false;
  }


  public addNewPeriod(startHour: number, startMinute: number, finishHour: number, finishMinute: number, temperature: number): void {
    this.day.addPeriod(new Period(new Time(startHour, startMinute), new Time(finishHour, finishMinute), temperature));
    if (this.viewContainerRef && this.viewContainerRef.get(0)) {
      this.viewContainerRef.get(0).destroy();
    }
  }

  public removeNewPeriod(): void {
    if (this.viewContainerRef && this.viewContainerRef.get(0)) {
      this.viewContainerRef.get(0).destroy();
    }
  }

}
