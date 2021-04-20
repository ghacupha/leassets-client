jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LeassetsFileUploadService } from '../service/leassets-file-upload.service';
import { ILeassetsFileUpload, LeassetsFileUpload } from '../leassets-file-upload.model';

import { LeassetsFileUploadUpdateComponent } from './leassets-file-upload-update.component';

describe('Component Tests', () => {
  describe('LeassetsFileUpload Management Update Component', () => {
    let comp: LeassetsFileUploadUpdateComponent;
    let fixture: ComponentFixture<LeassetsFileUploadUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let leassetsFileUploadService: LeassetsFileUploadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LeassetsFileUploadUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LeassetsFileUploadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LeassetsFileUploadUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      leassetsFileUploadService = TestBed.inject(LeassetsFileUploadService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const leassetsFileUpload: ILeassetsFileUpload = { id: 456 };

        activatedRoute.data = of({ leassetsFileUpload });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(leassetsFileUpload));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileUpload = { id: 123 };
        spyOn(leassetsFileUploadService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileUpload });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: leassetsFileUpload }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(leassetsFileUploadService.update).toHaveBeenCalledWith(leassetsFileUpload);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileUpload = new LeassetsFileUpload();
        spyOn(leassetsFileUploadService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileUpload });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: leassetsFileUpload }));
        saveSubject.complete();

        // THEN
        expect(leassetsFileUploadService.create).toHaveBeenCalledWith(leassetsFileUpload);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const leassetsFileUpload = { id: 123 };
        spyOn(leassetsFileUploadService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ leassetsFileUpload });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(leassetsFileUploadService.update).toHaveBeenCalledWith(leassetsFileUpload);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
