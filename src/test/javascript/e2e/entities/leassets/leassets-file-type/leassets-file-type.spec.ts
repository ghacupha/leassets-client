import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { LeassetsFileTypeComponentsPage, LeassetsFileTypeDeleteDialog, LeassetsFileTypeUpdatePage } from './leassets-file-type.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('LeassetsFileType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let leassetsFileTypeComponentsPage: LeassetsFileTypeComponentsPage;
  let leassetsFileTypeUpdatePage: LeassetsFileTypeUpdatePage;
  let leassetsFileTypeDeleteDialog: LeassetsFileTypeDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load LeassetsFileTypes', async () => {
    await navBarPage.goToEntity('leassets-file-type');
    leassetsFileTypeComponentsPage = new LeassetsFileTypeComponentsPage();
    await browser.wait(ec.visibilityOf(leassetsFileTypeComponentsPage.title), 5000);
    expect(await leassetsFileTypeComponentsPage.getTitle()).to.eq('Leassets File Types');
    await browser.wait(
      ec.or(ec.visibilityOf(leassetsFileTypeComponentsPage.entities), ec.visibilityOf(leassetsFileTypeComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LeassetsFileType page', async () => {
    await leassetsFileTypeComponentsPage.clickOnCreateButton();
    leassetsFileTypeUpdatePage = new LeassetsFileTypeUpdatePage();
    expect(await leassetsFileTypeUpdatePage.getPageTitle()).to.eq('Create or edit a Leassets File Type');
    await leassetsFileTypeUpdatePage.cancel();
  });

  it('should create and save LeassetsFileTypes', async () => {
    const nbButtonsBeforeCreate = await leassetsFileTypeComponentsPage.countDeleteButtons();

    await leassetsFileTypeComponentsPage.clickOnCreateButton();

    await promise.all([
      leassetsFileTypeUpdatePage.setLeassetsFileTypeNameInput('leassetsFileTypeName'),
      leassetsFileTypeUpdatePage.leassetsFileMediumTypeSelectLastOption(),
      leassetsFileTypeUpdatePage.setDescriptionInput('description'),
      leassetsFileTypeUpdatePage.setFileTemplateInput(absolutePath),
      leassetsFileTypeUpdatePage.leassetsfileTypeSelectLastOption(),
    ]);

    expect(await leassetsFileTypeUpdatePage.getLeassetsFileTypeNameInput()).to.eq(
      'leassetsFileTypeName',
      'Expected LeassetsFileTypeName value to be equals to leassetsFileTypeName'
    );
    expect(await leassetsFileTypeUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await leassetsFileTypeUpdatePage.getFileTemplateInput()).to.endsWith(
      fileNameToUpload,
      'Expected FileTemplate value to be end with ' + fileNameToUpload
    );

    await leassetsFileTypeUpdatePage.save();
    expect(await leassetsFileTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await leassetsFileTypeComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LeassetsFileType', async () => {
    const nbButtonsBeforeDelete = await leassetsFileTypeComponentsPage.countDeleteButtons();
    await leassetsFileTypeComponentsPage.clickOnLastDeleteButton();

    leassetsFileTypeDeleteDialog = new LeassetsFileTypeDeleteDialog();
    expect(await leassetsFileTypeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Leassets File Type?');
    await leassetsFileTypeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(leassetsFileTypeComponentsPage.title), 5000);

    expect(await leassetsFileTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
