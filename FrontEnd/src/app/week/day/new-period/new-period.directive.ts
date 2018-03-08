import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNewPeriod]'
})
export class NewPeriodDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
