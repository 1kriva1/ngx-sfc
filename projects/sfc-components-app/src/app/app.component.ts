import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'ngx-sfc-common';

@Component({
  selector: 'sfc-components-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public Theme = Theme;
  public theme: Theme = Theme.Default;

  constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.theme = params['theme'] ? params['theme'] : Theme.Default;
    });
  }

  public changeTheme(newTheme: string) {
    this.router.navigate([], {
      queryParams: { theme: newTheme },
      relativeTo: this.activatedRoute
    });
  }
}
