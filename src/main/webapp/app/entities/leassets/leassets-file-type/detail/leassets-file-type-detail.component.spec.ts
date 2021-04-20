import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DataUtils } from 'app/core/util/data-util.service';

import { LeassetsFileTypeDetailComponent } from './leassets-file-type-detail.component';

describe('Component Tests', () => {
  describe('LeassetsFileType Management Detail Component', () => {
    let comp: LeassetsFileTypeDetailComponent;
    let fixture: ComponentFixture<LeassetsFileTypeDetailComponent>;
    let dataUtils: DataUtils;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [LeassetsFileTypeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ leassetsFileType: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(LeassetsFileTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LeassetsFileTypeDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = TestBed.inject(DataUtils);
    });

    describe('OnInit', () => {
      it('Should load leassetsFileType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.leassetsFileType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from DataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeBase64, fakeContentType);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeBase64, fakeContentType);
      });
    });
  });
});
