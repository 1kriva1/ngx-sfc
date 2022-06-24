import { Component } from '@angular/core';
import { Position } from 'ngx-sfc-common';
import { ComponentSize, SortingDirection } from 'ngx-sfc-common';
import { ExpandedTableRowTemplate, IDefaultTableColumnModel, ITableDataModel, ITablePaginationModel, TableDataType, TableTemplate } from 'ngx-sfc-components';
import { faSortAmountUp, faSortAmountDown, faBolt, faCar, faPen, faStar, faAnchor, faUsers, faBicycle, faRocket, faTree, faStreetView,
faMagic, faObjectGroup, faMinusSquare, faMagnet, faMicrochip } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './tables-custom-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss'],
  styles: ['.component-column{ display: initial !important; text-align: center;}']
})
export class TablesCustomPresentationComponent {

  ComponentSize = ComponentSize;
  Position = Position;
  TableDataType = TableDataType;
  TableTemplate = TableTemplate;
  ExpandedTableRowTemplate = ExpandedTableRowTemplate;

  // columns
  columnsBadges: IDefaultTableColumnModel[] = [];
  columnsListItems: IDefaultTableColumnModel[] = [];
  columnsExpanded: IDefaultTableColumnModel[] = [];

  // data
  dataBadges: ITableDataModel[] = [];
  dataListItems: ITableDataModel[] = [];
  dataExpandedTemplate: ITableDataModel[] = [];
  dataExpandedReference: ITableDataModel[] = [];

  paginationBadgesConfig: ITablePaginationModel = { enabled: true, page: 1, size: 5 };

  ngOnInit(): void {
    // badges
    this.columnsBadges = this.getBadgesColumns();
    this.dataBadges = this.getBagdesData();

    // list of items
    this.columnsListItems = this.getListItemsColumns();
    this.columnsListItems.forEach(column => {
      column.sorting = {
        enabled: true,
        direction: SortingDirection.Ascending,
        icons: [{ direction: SortingDirection.Ascending, icon: faSortAmountUp }, { direction: SortingDirection.Descending, icon: faSortAmountDown }]
      }
    });
    this.dataListItems = this.getListItemsData();

    // expanded
    this.columnsExpanded = this.getExpandedColumns();
    this.dataExpandedTemplate = this.getExpandedData();
    this.dataExpandedReference = this.getExpandedData();
  }

  // STUBS

  private getBadgesColumns(): IDefaultTableColumnModel[] {
    return [
      {
        name: '',
        field: 'label'
      },
      {
        name: '',
        field: 'icon'
      },
      {
        name: '',
        field: 'color'
      }
    ]
  }

  private getBagdesData(): ITableDataModel[] {
    return [
      {
        data: {
          label: 'INITIATOR',
          icon: faBolt,
          color: 'yellow'
        },
        selected: false
      },
      {
        data: {
          label: 'Nuker',
          icon: faCar,
          color: 'pink'
        },
        selected: false
      },
      {
        data: {
          label: 'Disabler',
          icon: faPen,
          color: 'orange'
        },
        selected: false
      },
      {
        data: {
          label: 'Ganker',
          icon: faStar,
          color: 'red'
        },
        selected: false
      },
      {
        data: {
          label: 'Durable',
          icon: faAnchor,
          color: 'purple'
        },
        selected: false
      },
      {
        data: {
          label: 'Roamer',
          icon: faBicycle,
          color: 'teal'
        },
        selected: false
      },
      {
        data: {
          label: 'Pusher',
          icon: faUsers,
          color: 'blue'
        },
        selected: false
      },
      {
        data: {
          label: 'Escape',
          icon: faRocket,
          color: 'blue-dark'
        },
        selected: false
      },
      {
        data: {
          label: 'Jungler',
          icon: faTree,
          color: 'green'
        },
        selected: false
      },
      {
        data: {
          label: 'Offlaner',
          icon: faStreetView,
          color: 'green-dark'
        },
        selected: false
      },
      {
        data: {
          label: 'Carry',
          icon: faBolt,
          color: 'silver'
        },
        selected: false
      },
      {
        data: {
          label: 'SUPPORT',
          icon: faMagic,
          color: 'gold'
        },
        selected: false
      }
    ]
  }

  private getListItemsColumns(): IDefaultTableColumnModel[] {
    return [
      {
        name: 'Client',
        field: 'client'
      },
      {
        name: 'Activity',
        field: 'activity'
      },
      {
        name: 'On Date',
        field: 'onDate'
      },
      {
        name: 'Status',
        field: 'status'
      }
    ]
  }

  private getListItemsData(): ITableDataModel[] {
    return [
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Industrial Group LTD',
          clientNumber: '02000240',
          isVIP: true,
          activity: 'Incoming transfer 2,000,000 USD',
          onDate: '14.02.2022',
          status: 'Processing'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Marry Roseberg',
          clientNumber: '02000250',
          isVIP: false,
          activity: 'Requested new credit card',
          onDate: '13.02.2022',
          status: 'Processing'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Green Corporation LTD',
          clientNumber: '02000260',
          isVIP: true,
          activity: 'Requested a loan',
          onDate: '10.02.2022',
          status: 'InReview'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Viena LTD',
          clientNumber: '02000270',
          isVIP: true,
          activity: 'Passport expires',
          onDate: '10.01.2022',
          status: 'InReview'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Jane Brice',
          clientNumber: '02000280',
          isVIP: false,
          activity: 'Payment card expires',
          onDate: '10.10.2022',
          status: 'NewCardIssue'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Nicole Marcus',
          clientNumber: '02000290',
          isVIP: true,
          activity: 'Payment card expires',
          onDate: '10.11.2022',
          status: 'NewCardIssue'
        },
        selected: false
      },
      {
        data: {
          photo: '../assets/belgium_eden_hazard.png',
          client: 'Mathias Prez',
          clientNumber: '02000290',
          isVIP: true,
          activity: 'Expires Power Of Attorney',
          onDate: '10.11.2022',
          status: 'NotInformed'
        },
        selected: false
      },
    ]
  }

  private getExpandedColumns() {
    return [
      {
        name: 'Domain &  Plan Name',
        field: 'domainAndPlanName',
        icon: undefined
      },
      {
        name: 'Storage',
        field: 'storage',
        icon: undefined
      },
      {
        name: 'Monthly Visitor',
        field: 'monthlyVisitor'
      },
      {
        name: 'Domains',
        field: 'domains'
      },
      {
        name: 'Status',
        field: 'status'
      }
    ];
  }

  private getExpandedData() {
    return [
      {
        data: {
          domain: 'paperpillar.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 5,
          domainsMax: 10,
          status: 'Active',
          icon: faObjectGroup,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            },
            {
              planName: 'stock.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Add-on',
              status: 'Active'
            },
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'samanthawillam.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 1,
          domainsMax: 10,
          status: 'Active',
          icon: faMinusSquare,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'testpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 5,
          domainsMax: 10,
          status: 'Active',
          icon: faMagnet,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 5,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 2,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 3,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 4,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 6,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 7,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 8,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 9,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      },
      {
        data: {
          domain: 'mattpillow.com',
          planName: 'Professional Plan',
          storageMin: 1.2,
          storageMax: 35.36,
          monthlyVisitorMin: 1.2,
          monthlyVisitorMax: 35.36,
          domainsMin: 10,
          domainsMax: 10,
          status: 'Active',
          icon: faMicrochip,
          items: [
            {
              planName: 'papperpillar.com',
              storage: 1.5,
              monthlyVisitor: 1.5,
              domain: 'Primary',
              status: 'Active'
            },
            {
              planName: 'supply.papperpillar.com',
              storage: 1.5,
              monthlyVisitor: null,
              domain: 'Staging',
              status: 'Active'
            }
          ]
        },
        selected: false
      }
    ]
  }

  // END STUBS
}
