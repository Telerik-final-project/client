import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { IDynamicButtons } from './../../models/dynamic.buttons.interface';
import { DynamicButtonsService } from './../dynamic.buttons.service';

@Injectable()
export class ButtonsResolver implements Resolve<IDynamicButtons[]> {
  constructor(private btnService: DynamicButtonsService) {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): IDynamicButtons[] | Observable<IDynamicButtons[]> | Promise<IDynamicButtons[]> {
    return this.btnService.getAll().catch(() => {
      return Observable.of([] as IDynamicButtons[]);
    });
  }
}
