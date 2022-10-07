import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './datetime-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class DateTimePresentationComponent extends BasePresentationComponent {
}
