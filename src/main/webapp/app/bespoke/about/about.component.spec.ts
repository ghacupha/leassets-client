import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';

import { AboutComponent } from './about.component';

describe('Component Tests', () => {
  describe('About Component', () => {
    let comp: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let mockAccountService: AccountService;
    let mockRouter: Router;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [AboutComponent],
          providers: [AccountService, Router],
        })
          .overrideTemplate(AboutComponent, '')
          .compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(AboutComponent);
      comp = fixture.componentInstance;
      mockAccountService = TestBed.inject(AccountService);
      mockAccountService.identity = jest.fn(() => of(null));
      mockAccountService.getAuthenticationState = jest.fn(() => of(null));
      mockRouter = TestBed.inject(Router);
    });

    it('Should call accountService.getAuthenticationState on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(mockAccountService.getAuthenticationState).toHaveBeenCalled();
    });

    it('Should call accountService.isAuthenticated when it checks authentication', () => {
      // WHEN
      comp.isAuthenticated();

      // THEN
      expect(mockAccountService.isAuthenticated).toHaveBeenCalled();
    });

    it('Should navigate to /login on login', () => {
      // WHEN
      comp.login();

      // THEN
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
