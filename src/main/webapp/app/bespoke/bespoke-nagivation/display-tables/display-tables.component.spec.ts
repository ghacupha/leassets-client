/* eslint-disable @typescript-eslint/no-empty-function */
import { Router } from '@angular/router';

jest.mock('@angular/router');
jest.mock('app/core/auth/account.service');
jest.mock('app/login/login.service');

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DisplayTablesComponent } from './display-tables.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'app/core/auth/account.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LoginService } from 'app/login/login.service';
import { of } from 'rxjs';
import { ProfileInfo } from 'app/layouts/profiles/profile-info.model';
import { NGXLogger } from 'ngx-logger';

/**
 * Simple do-nothing mock for the NGXLogger
 */
class LoggerMock {
  debug(): void {}
  info(): void {}
  error(): void {}
}

describe('DisplayTablesComponent', () => {
  let component: DisplayTablesComponent;
  let fixture: ComponentFixture<DisplayTablesComponent>;
  let mockAccountService: AccountService;
  let profileService: ProfileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DisplayTablesComponent],
        providers: [AccountService, Router, LoginService, { provide: NGXLogger, useClass: LoggerMock }],
      })
        .overrideTemplate(DisplayTablesComponent, '')
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTablesComponent);
    component = fixture.componentInstance;
    mockAccountService = TestBed.inject(AccountService);
    profileService = TestBed.inject(ProfileService);
  });

  it('should create', function () {
    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('Should call profileService.getProfileInfo on init', () => {
    // GIVEN
    spyOn(profileService, 'getProfileInfo').and.returnValue(of(new ProfileInfo()));

    // WHEN
    component.ngOnInit();

    // THEN
    expect(profileService.getProfileInfo).toHaveBeenCalled();
  });

  it('Should call accountService.isAuthenticated on authentication', () => {
    // WHEN
    component.isAuthenticated();

    // THEN
    expect(mockAccountService.isAuthenticated).toHaveBeenCalled();
  });
});
