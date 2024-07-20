import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { datetimeStringToFormattedString } from './saathratri-local-dayjs-and-utc-unix.pipe';

@Directive({
  selector: '[jhiSaathratriDatetimeString]',
})
export class SaathratriDatetimeStringDirective implements OnInit {
  @Input() datetimeString: string | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.transform(this.datetimeString));
  }

  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    return datetimeStringToFormattedString(value); // Format
  }
}
