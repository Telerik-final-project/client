import { CommonModule } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
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

describe('component: TableComponent -> dynamic buttons', () => {

    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let mockMatSnackBar;
    let mockSharedSnackModule;
    let mockHttpHandler;
    let mockHttpClient;
    let mockAppConfig;
    let mockDynamicButtonsService;
    let mockMatDialog;
    let mockRouter;
    let paginatedButtons;
    let dataSource;
    let sort;
    let service;

    beforeEach(() => {

        mockMatSnackBar = {};
        mockSharedSnackModule = {};
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
                { provide: SharedSnackModule, useValue: mockSharedSnackModule },
                { provide: MatSnackBar, useValue: mockMatSnackBar },
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

    describe('ngOnInit', () => {

        it('After ngOnInit load database method should be called once', () => {
            spyOn((component as any), 'loadDBInfo');

            component.ngOnInit();

            expect((component as any).loadDBInfo).toHaveBeenCalled();
        });

        it('dataSource should be undefined if there is no paginatedButtons', () => {
            paginatedButtons = 0;

            expect(dataSource).toBeUndefined();

            paginatedButtons = -1;
            expect(dataSource).toBeUndefined();
        });

        it('dataSource should be undefined if paginatedButtons`s type isn`t number', () => {
            paginatedButtons = 'asdasd';
            expect(dataSource).toBeUndefined();
        });
    });
});
