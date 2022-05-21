import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChartThemeModel } from './chart-theme.model';

@Injectable({
  providedIn: 'root'
})
export class ChartThemeService {

  private model!: ChartThemeModel;

  private colorsSubject: Subject<ChartThemeModel> = new Subject<ChartThemeModel>();

  public colors$ = this.colorsSubject.asObservable();

  setColors(model: ChartThemeModel): void {
    this.model = model;
    this.colorsSubject.next(model);
  }

  getColors(): ChartThemeModel {
    return this.model;
  }
}
