import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TableComponent } from '../app/admin/dynamic-buttons/listing/table/table.component';
import { AppConfig } from '../app/config/app.config';
import { DynamicButtonsService } from '../app/core/dynamic.buttons.service';
import { SharedSnackModule } from '../app/shared/material/shared-snack.module';
import { mockDirective } from './mocks/directives/mock-directive';
import { MockMatCardActions } from './mocks/mat-card-actions';
import { MockMatCell } from './mocks/mat-cell';
import { MockMatFormField } from './mocks/mat-form-field';
import { MockMatHeaderCell } from './mocks/mat-header-cell';
import { MockMatHeaderRow } from './mocks/mat-header-row';
import { MockMatIcon } from './mocks/mat-icon';
import { MockMatRow } from './mocks/mat-row';
import { MockMatTable } from './mocks/mat-table';

describe('Component: TableComponent ( dynamic buttons )', () => {

    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;

    let mockDynamicButtonsService = {
        getAll: () => Observable.of({ body: [] }),
    };

    const mockData = {
        id: 1,
        name: 'btn.name',
        targetUrl: 'btn.target',
        iconUrl: 'btn.link',
        date: 'btn.createdAt',
        edit: 'edit',
        delete: 'delete',
        type: 'btn.type',
    };

    let mockMatSnackBar = {
        openSnackMsg: (...args) => { },
    };

    let mockHttpHandler;
    let mockHttpClient;
    let mockAppConfig;
    let mockMatDialog;
    let mockRouter;
    let service;

    beforeEach(() => {

        mockHttpHandler = {};
        mockHttpClient = {};
        mockAppConfig = {};
        mockMatDialog = {};
        mockRouter = {};

        TestBed.configureTestingModule({
            declarations: [
                TableComponent,
                MockMatFormField,
                MockMatTable,
                MockMatHeaderCell,
                MockMatHeaderRow,
                MockMatCell,
                MockMatIcon,
                MockMatCardActions,
                MockMatRow,
                mockDirective({
                    selector: '[matHeaderRowDef]',
                    inputs: ['matHeaderRowDef'],
                }),
                mockDirective({
                    selector: '[matRowDefColumns]',
                    inputs: ['matRowDefColumns'],
                }),
            ],
            providers: [
                { provide: Router, useValue: mockRouter },
                { provide: MatDialog, useValue: mockMatDialog },
                { provide: DynamicButtonsService, useValue: mockDynamicButtonsService },
                { provide: AppConfig, useValue: mockAppConfig },
                { provide: HttpClient, useValue: mockHttpClient },
                { provide: HttpHandler, useValue: mockHttpHandler },
                { provide: SharedSnackModule, useValue: mockMatSnackBar },
            ],
            imports: [
                CommonModule,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;

        service = TestBed.get(DynamicButtonsService);
    });

    describe('-ngOnInit', () => {

        beforeEach(inject(
            [
                DynamicButtonsService,
                SharedSnackModule,
                // tslint:disable-next-line:align
            ], (
                btnsService: DynamicButtonsService,
                snackService: SharedSnackModule,
            ) => {
                mockDynamicButtonsService = btnsService;
                mockMatSnackBar = snackService;
            }));

        it('after ngOnInit load database method should be called once', () => {

            spyOn((component as any), 'loadDBInfo');

            component.ngOnInit();

            expect((component as any).loadDBInfo).toHaveBeenCalled();

        });

        it('when there is no data a pop-up should appear', fakeAsync(() => {

            spyOn(mockMatSnackBar, 'openSnackMsg');

            const serviceSpy = spyOn(mockDynamicButtonsService, 'getAll');
            serviceSpy.and.returnValue(Observable.of({ body: [] }));

            component.ngOnInit();
            tick();

            expect(serviceSpy).toHaveBeenCalledTimes(1);
            expect(mockMatSnackBar.openSnackMsg).toHaveBeenCalled();

        }));

        it('dataSource.data should be empty array if there is no paginatedButtons', () => {

            component.paginatedButtons = 0;

            spyOn(service, 'getAll').and.returnValue(Observable.of({ body: [] }));

            component.ngOnInit();

            const actualLength = component.dataSource.data.length;
            expect(actualLength).toEqual(0);

        });
    });

    describe('-applyFilter', () => {

        it('dataSource.filter shouldn`t be empty string if applyFilter has been called', () => {

            const expectedFilterValue = 'filterValue';

            component.applyFilter(expectedFilterValue);

            const actualFilterValue = component.dataSource.filter;
            expect(actualFilterValue).toEqual(expectedFilterValue);

        });

    });

});
