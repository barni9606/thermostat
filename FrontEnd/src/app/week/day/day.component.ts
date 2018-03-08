import {
  Component, ComponentFactory, ComponentFactoryResolver, Input, OnInit, ViewChild,
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
  public day: Day;

  private flag = false;
  @ViewChild(NewPeriodDirective) newPeriodHost: NewPeriodDirective;
  private componentFactory: ComponentFactory<NewPeriodComponent>;
  private viewContainerRef: ViewContainerRef;
  private componentRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.day = new Day();
    for (let i = 0; i < 10; i++) {
      const a = Math.floor(Math.random() * 24);
      const b = a + Math.floor(Math.random() * (24 - a));
      this.day.addPeriod(new Period(new Time(a, 0), new Time(b, 0)));
    }
  }

  ngOnInit() {

  }

  onMouseDown(event): void {
    event.preventDefault();
    if (!this.flag) {
      const target = event.target || event.srcElement;
      if (target.className === 'day') {
        if (this.viewContainerRef && this.viewContainerRef.get(0)) {
          this.viewContainerRef.get(0).destroy();
        } else {
          this.flag = true;
          const offset = target.getClientRects().item(0);

          this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewPeriodComponent);
          this.viewContainerRef = this.newPeriodHost.viewContainerRef;
          this.viewContainerRef.clear();
          this.componentRef = this.viewContainerRef.createComponent(this.componentFactory);

          (<NewPeriodComponent>this.componentRef.instance).pos.top = event.clientY - offset.top;
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
        // console.log('x:' + (event.clientX - offset.left) + ' y:' + (event.clientY - offset.top));
        const pos = (<NewPeriodComponent>this.componentRef.instance).pos;
        pos.height = event.clientY - offset.top - pos.top;
      } else if (target.parentElement.parentElement.className === 'day') {
        const offset = target.parentElement.parentElement.getClientRects().item(0);
        const pos = (<NewPeriodComponent>this.componentRef.instance).pos;
        pos.height = event.clientY - offset.top - pos.top;
      }
    }
  }

  onMouseUp(event): void {
    event.preventDefault();
    this.flag = false;
  }

  onMouseOut(event): void {
    event.preventDefault();
    // this.flag = false;
  }

}
