import { Component, HostListener, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ColumnsToggleConstants } from './columns-toggle.constants';
import { ColumnsToggleService } from './service/columns-toggle.service';

@Component({
  selector: 'sfc-columns-toggle',
  templateUrl: './columns-toggle.component.html',
  styleUrls: ['./columns-toggle.component.scss']
})
export class ColumnsToggleComponent implements OnInit {

  @HostListener('click')
  onToggle() {
    this.service.toggle();
  }

  public vm$!: Observable<any>;

  constructor(private service: ColumnsToggleService) { }

  ngOnInit(): void {
    this.vm$ = this.service.showColumns$.pipe(
      map(show => {
        return {
          model: show ? ColumnsToggleConstants.HIDE : ColumnsToggleConstants.SHOW,
          show: show
        }
      }))
  }
}
