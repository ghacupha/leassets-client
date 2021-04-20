jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LeassetsFileTypeService } from '../service/leassets-file-type.service';
import { ILeassetsFileType, LeassetsFileType } from '../leassets-file-type.model';

import { LeassetsFileTypeUpdateComponent } from './leassets-file-type-update.component';

describe('Component Tests', () => {
  describe('LeassetsFileType Management Update Component', () => {
    let comp: LeassetsFileTypeUpdateComponent;
    let fixture: ComponentFixture<LeassetsFileTypeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let leassetsFileTypeService: LeassetsFileTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LeassetsFileTypeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LeassetsFileTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeassetsFileTypeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      leassetsFileTypeService = TestBed.inject(LeassetsFileTypeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const leassetsFileType: ILeassetsFileType = { id: 456 };

        activatedRoute.data = of({ leassetsFileType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(leassetsFileType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileType = { id: 123 };
        spyOn(leassetsFileTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: leassetsFileType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(leassetsFileTypeService.update).toHaveBeenCalledWith(leassetsFileType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileType = new LeassetsFileType();
        spyOn(leassetsFileTypeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: leassetsFileType }));
        saveSubject.complete();

        // THEN
        expect(leassetsFileTypeService.create).toHaveBeenCalledWith(leassetsFileType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileType = { id: 123 };
        spyOn(leassetsFileTypeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(leassetsFileTypeService.update).toHaveBeenCalledWith(leassetsFileType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
