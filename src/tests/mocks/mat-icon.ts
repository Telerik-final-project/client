import { Component, Input } from '@angular/core';

@Component({
    selector: 'mat-icon',
    template: '',
})
export class MockMatIcon {
    @Input() public routerLink;
        constructor() { }
}
