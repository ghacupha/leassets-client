///
/// Granular Summaries - Granular data analysis system
/// Copyright © 2020 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

/**
 * Very mundane yet useful for sending route state data to the component
 * we are navigating to even though the component does not have a parent
 * child relationship with the originator of data
 * The service is generic and transmits data of type T
 */
@Injectable({
  providedIn: 'root',
})
export class RouteStateService<T> {
  private _data!: T;

  constructor(private log: NGXLogger) {}

  reset(): void {
    this.log.debug('Resetting route-state...standby for cleanup');
    // this._data = undefined;
  }

  public get data(): T {
    this.log.debug(`Data requested... returning ${this._data}`);
    return this._data;
  }

  public set data(value: T) {
    this._data = value;
    this.log.debug(`Setting data for route states ${this._data}`);
  }
}
