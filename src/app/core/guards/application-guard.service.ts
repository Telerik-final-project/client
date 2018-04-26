import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ICanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
export class ApplicationGuard implements CanDeactivate<ICanComponentDeactivate> {
    public canDeactivate(component: ICanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
