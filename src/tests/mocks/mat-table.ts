import { Component, Input } from '@angular/core';

@Component({
    selector: 'mat-table',
    template: '',
})
export class MockMatTable {
    @Input() public dataSource;

    constructor() { }
}
