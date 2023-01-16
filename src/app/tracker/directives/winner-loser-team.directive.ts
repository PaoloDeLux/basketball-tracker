import { AfterViewInit, Directive, ElementRef, HostListener, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appWinnerLoserTeam]'
})

export class WinnerLoserTeamDirective implements AfterViewInit {
  
  @Input() winner: boolean | undefined;
  
  constructor(private elRef: ElementRef) {
  }
  ngAfterViewInit(): void {
    this.elRef.nativeElement.style.borderRadius = '100%';
    this.elRef.nativeElement.style.padding = '3px';
    this.elRef.nativeElement.style.width = '20px';
    this.elRef.nativeElement.style.display = 'inline';
    this.elRef.nativeElement.style.margin = '2px';

    if(this.winner){
      this.elRef.nativeElement.style.backgroundColor = 'green';
    } else {
      this.elRef.nativeElement.style.backgroundColor = 'red';
    }
  }
}
