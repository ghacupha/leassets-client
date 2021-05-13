import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VERSION } from 'app/app.constants';
import { NavigationQuestionnaireModalService } from 'app/bespoke/navigation-questionnaire/navigation-questionnaire-modal.service';
import { RouteStateService } from 'app/bespoke/route-state.service';
import { AccountService } from 'app/core/auth/account.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { LoginService } from 'app/login/login.service';

@Component({
  selector: 'gha-display-tables',
  templateUrl: './display-tables.component.html',
  styleUrls: ['./display-tables.component.scss'],
})
export class DisplayTablesComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  openAPIEnabled?: boolean;
  version = '';

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private profileService: ProfileService,
    private router: Router,
    private navigationPathService: RouteStateService<string>,
    private navigationQuestionnaireModelService: NavigationQuestionnaireModalService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : 'v' + VERSION;
    }
  }

  ngOnInit(): void {
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });
  }

  navigateNBVDatatable(): void {
    this.navigationPathService.data = '/display/fixed-asset-nbv';
    this.navigationQuestionnaireModelService.open();

    this.collapseNavbar();
  }

  navigateDepreciationDatatable(): void {
    this.navigationPathService.data = '/display/fixed-asset-depreciation-display';
    this.navigationQuestionnaireModelService.open();
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  getImageUrl(): string {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : '';
  }
}
