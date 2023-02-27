import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { isDefined } from '../../utils';
import { ImageLoadEvent } from './services/image-load.event';
import { ImageLoadService } from './services/image-load.service';

@Directive({
  selector: '[sfcImageLoad]'
})
export class ImageLoadDirective {

  @Output('sfcImageLoad')
  public action = new EventEmitter<Event>();

  @HostListener('load', ['$event'])
  private onLoad(event: Event) {
    const loadEvent: ImageLoadEvent = {
      natural: {
        height: this.el.nativeElement.naturalHeight,
        width: this.el.nativeElement.naturalWidth
      },
      offset: {
        height: this.el.nativeElement.offsetHeight,
        width: this.el.nativeElement.offsetWidth
      }
    };
    
    this.loadService.load(loadEvent);

    if (isDefined(this.action))
      this.action.emit(event);
  }

  constructor(private el: ElementRef, private loadService: ImageLoadService) { }
}
