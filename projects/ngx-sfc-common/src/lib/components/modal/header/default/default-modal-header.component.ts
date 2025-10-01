import { Component, Input, OnInit } from '@angular/core';
import { IDefaultModalHeaderModel } from './default-modal-header.model';
import { isDefined } from '../../../../utils';
import { ModalService } from '../../service/modal.service';
import { faWindowRestore, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DefaultModalHeaderConstants } from './default-modal-header.constants';

@Component({
  selector: 'sfc-default-modal-header',
  templateUrl: './default-modal-header.component.html',
  styleUrls: ['./default-modal-header.component.scss']
})
export class DefaultModalHeaderComponent implements OnInit {

  /* Inputs */

  @Input()
  id!: string;

  @Input()
  model!: IDefaultModalHeaderModel;

  /* End Inputs */

  /* Properties */

  public get icon(): IconDefinition { return this.model?.icon || faWindowRestore; }

  /* End Properties */

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    if (!isDefined(this.model))
      this.model = DefaultModalHeaderConstants.DEFAULT_MODAL_HEADER_MODEL;
  }

  public onClose(): void {
    this.modalService.close(this.id);
  }
}
