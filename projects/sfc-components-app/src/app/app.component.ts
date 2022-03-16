import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIConstants } from 'ngx-sfc-common';
import { ThemeType } from '../shared/enums/theme-type.enum';

@Component({
  selector: 'sfc-components-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public ThemeType = ThemeType;
  public UIConstants = UIConstants;
  public theme: ThemeType = ThemeType.Default;

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.theme = params['theme'] ? params['theme'] : ThemeType.Default;
    });
  }

  public changeTheme(newTheme: string) {
    this.router.navigate([], {
      queryParams: { theme: newTheme },
      relativeTo: this.activatedRoute
    });
  }
}
