// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';

// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import { Observable } from 'rxjs/Observable';

// import { IDynamicButtons } from './../../models/dynamic.buttons.interface';
// import { DynamicButtonsService } from './../dynamic.buttons.service';
// import { IElements } from '../../admin/dynamic-buttons/_interfaces/listing.interface';

// @Injectable()
// export class ButtonsResolver implements Resolve<IElements[]> {
//   constructor(private btnService: DynamicButtonsService) {}
//   public resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot,
//   ): IElements[] | Observable<IElements[]> | Promise<IElements[]> {
//     return this.btnService.getAll().catch(() => {
//       return Observable.of([] as IElements[]);
//     });
//   }
// }
