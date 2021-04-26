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

import { Moment } from 'moment';

/**
 * This interface maintains the fields for navigating to the corresponding
 * reports
 */
export interface INavigationQuestionnaire {
  reportingPeriod?: Moment;
}

/**
 * This class maintains the fields for navigating to the corresponding
 * reports
 */
export class NavigationQuestionnaire implements INavigationQuestionnaire {
  constructor(public reportingPeriod?: Moment) {}
}
