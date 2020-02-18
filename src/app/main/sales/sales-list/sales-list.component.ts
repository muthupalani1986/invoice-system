import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

import { saveAs } from 'file-saver';
import { QuotationsService } from '../../quotation/quotations.service';
import { QuotationService } from '../../quotation/quotation.service';
import { NotificationService } from '../../../services/notification.service';
import { HttpQuotationService } from '../../../services/http-quotation.service';
import { Quotation } from '../../quotation/quotation.model';
import { DeleteConfirmationDialogComponent } from '../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SNACK_BAR_MSGS } from '../../../constants/notification.constants';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class SalesListComponent implements OnInit, OnDestroy {
  dataSource: FilesDataSource | null;
  displayedColumns = ['inv_number', 'actions'];

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild('filter', { static: true })
  filter: ElementRef;

  // Private
  private _unsubscribeAll: Subject<any>;
  private createSales$: Subscription
  constructor(
    private _quotationsService: QuotationsService,
    private _router: Router,
    public _dialog: MatDialog,
    private _quotationService: QuotationService,
    private _notificationService: NotificationService,
    private _httpQuotationService: HttpQuotationService
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.dataSource = new FilesDataSource(this._quotationsService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }

        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  public editQuotation(quotation: Quotation) {
    let billNumber;
    const isInvNumberSet = quotation.inv_number && quotation.inv_number.length !== 0;
    if (isInvNumberSet) {
      billNumber = quotation.inv_number;
    } else {
      billNumber = quotation.quotation_number;
    }
    this._router.navigate(['/quote/quotation/' + quotation.id + '/' + billNumber]);
  }
  public deleteQuotation(quotation: Quotation) {
    this.openDialog(quotation);
  }
  openDialog(quotation): void {
    const requestPayload = {
      id: quotation.id
    };
    const dialogRef = this._dialog.open(DeleteConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'ok') {
        this._quotationService.deleteQuotation(requestPayload).then((respose) => {
          this._notificationService.show('Invoice deleted successfully', 'success');
          const index: number = this._quotationsService.quotations.findIndex(item => item.id === requestPayload.id);
          this._quotationsService.quotations.splice(index, 1);
          this.dataSource = new FilesDataSource(this._quotationsService, this.paginator, this.sort);
        }, (err) => {
          this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
        });

      }
    });
  }
  onCreateInvoice(quotation: Quotation): void {
    if (quotation.status == 1) {      
      this.createInvoice(quotation);
    }
  }
  onDownloadReceipt(quotation: Quotation):void{
    this.downloadInvoice(quotation);
  }
  private createInvoice(quotation: Quotation) {
    this.createSales$=this._httpQuotationService.createSale(quotation.id).subscribe((saleRes) => {
      const statusCode = _.get(saleRes, 'statusCode');
      if (statusCode === '0000') {
        this._notificationService.show(saleRes.message, 'success');
        const rowIndex = _.findIndex(this._quotationsService.quotations, { 'id': quotation.id });
        if (rowIndex !== -1) {
          this._quotationsService.quotations[rowIndex].inv_number = saleRes.invoice_number;
          this._quotationsService.quotations[rowIndex].status = 2;
        }
      } else {
        this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
      }
    }, (err) => {
      this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
    });
  }
  private downloadInvoice(quotation: Quotation) {
    this._httpQuotationService.downloadInvoice(quotation);
  }
  ngOnDestroy() {
    if(this.createSales$){
      this.createSales$.unsubscribe();
    }    
  }
}

export class FilesDataSource extends DataSource<any>
{
  private _filterChange = new BehaviorSubject('');
  private _filteredDataChange = new BehaviorSubject('');

  /**
   * Constructor
   *
   * @param {_categoriesService} _categoriesService
   * @param {MatPaginator} _matPaginator
   * @param {MatSort} _matSort
   */
  constructor(
    private _quotationsService: QuotationsService,
    private _matPaginator: MatPaginator,
    private _matSort: MatSort
  ) {
    super();

    this.filteredData = this._quotationsService.quotations;
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   *
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._quotationsService.onQuotationsChanged,
      this._matPaginator.page,
      this._filterChange,
      this._matSort.sortChange
    ];

    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          let data = this._quotationsService.quotations.slice();

          data = this.filterData(data);

          this.filteredData = [...data];

          data = this.sortData(data);

          // Grab the page's slice of data.
          const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
          return data.splice(startIndex, this._matPaginator.pageSize);
        }
        ));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // Filtered data
  get filteredData(): any {
    return this._filteredDataChange.value;
  }

  set filteredData(value: any) {
    this._filteredDataChange.next(value);
  }

  // Filter
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Filter data
   *
   * @param data
   * @returns {any}
   */
  filterData(data): any {
    if (!this.filter) {
      return data;
    }
    return this.filterArrayByString(data, this.filter);
  }

  /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
  private filterArrayByString(mainArr, searchText): any {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();
    return _.filter(mainArr, function (itemObj) {      
      const inv_number = itemObj.inv_number ? itemObj.inv_number.toLowerCase() : '';
      return _.includes(inv_number, searchText);
    });
  }

  /**
   * Sort data
   *
   * @param data
   * @returns {any[]}
   */
  sortData(data): any[] {
    if (!this._matSort.active || this._matSort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._matSort.active) {
        case 'quotation_number':
          [propertyA, propertyB] = [a.name, b.name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * Disconnect
   */
  disconnect(): void {
  }
}
