import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronCircleDown, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { isNullOrEmptyString } from '../../utils';

@Component({
  selector: 'sfc-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent implements OnInit {

  private readonly DEFAULT_LABEL = 'Show more';

  @Input()
  label!: string;

  @Input()
  icon: IconDefinition = faChevronCircleDown;

  @Output()
  more: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
    if (isNullOrEmptyString(this.label))
      this.label = this.DEFAULT_LABEL;
  }
}