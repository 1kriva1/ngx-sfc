import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { ColumnsToggleConstants } from './columns-toggle.constants';
import { ColumnsToggleService } from './service/columns-toggle.service';

@Component({
  selector: 'sfc-columns-toggle',
  templateUrl: './columns-toggle.component.html',
  styleUrls: ['./columns-toggle.component.scss']
})
export class ColumnsToggleComponent implements OnInit {

  @Input()
  showLabel: string = ColumnsToggleConstants.HIDE_LABEL_DEFAULT;

  @Input()
  hideLabel: string = ColumnsToggleConstants.SHOW_LABEL_DEFAULT;

  @HostListener('click')
  onToggle() { this.service.toggle(); }

  public vm$!: Observable<any>;

  constructor(private service: ColumnsToggleService) { }

  ngOnInit(): void {
    this.vm$ = this.service.toggle$.pipe(
      map(show => {
        return {
          model: show ? { LABEL: this.hideLabel, ICON: faEye } : { LABEL: this.showLabel, ICON: faEyeSlash },
          show: show
        }
      }))
  }
}
