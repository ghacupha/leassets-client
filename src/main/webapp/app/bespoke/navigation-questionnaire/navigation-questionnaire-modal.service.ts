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
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NavigationQuestionnaireComponent } from 'app/bespoke/bespoke-navigation/navigation-questionnaire/navigation-questionnaire.component';

/**
 * This questionnaire opens or closes the navigation questionnaire in a modal when prompted
 */
@Injectable({
  providedIn: 'root',
})
export class NavigationQuestionnaireModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(NavigationQuestionnaireComponent);
    modalRef.result.finally(() => (this.isOpen = false));
  }

  close(): void {
    if (this.modalService.hasOpenModals()) {
      this.modalService.dismissAll('Questionnaire-navigation client requested closure...');
    }
  }
}
