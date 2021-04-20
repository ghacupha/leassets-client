import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  LeassetsFileUploadComponentsPage,
  LeassetsFileUploadDeleteDialog,
  LeassetsFileUploadUpdatePage,
} from './leassets-file-upload.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('LeassetsFileUpload e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let leassetsFileUploadComponentsPage: LeassetsFileUploadComponentsPage;
  let leassetsFileUploadUpdatePage: LeassetsFileUploadUpdatePage;
  let leassetsFileUploadDeleteDialog: LeassetsFileUploadDeleteDialog;
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

  it('should load LeassetsFileUploads', async () => {
    await navBarPage.goToEntity('leassets-file-upload');
    leassetsFileUploadComponentsPage = new LeassetsFileUploadComponentsPage();
    await browser.wait(ec.visibilityOf(leassetsFileUploadComponentsPage.title), 5000);
    expect(await leassetsFileUploadComponentsPage.getTitle()).to.eq('Leassets File Uploads');
    await browser.wait(
      ec.or(ec.visibilityOf(leassetsFileUploadComponentsPage.entities), ec.visibilityOf(leassetsFileUploadComponentsPage.noResult)),
      1000
    );
  });

  it('should load create LeassetsFileUpload page', async () => {
    await leassetsFileUploadComponentsPage.clickOnCreateButton();
    leassetsFileUploadUpdatePage = new LeassetsFileUploadUpdatePage();
    expect(await leassetsFileUploadUpdatePage.getPageTitle()).to.eq('Create or edit a Leassets File Upload');
    await leassetsFileUploadUpdatePage.cancel();
  });

  it('should create and save LeassetsFileUploads', async () => {
    const nbButtonsBeforeCreate = await leassetsFileUploadComponentsPage.countDeleteButtons();

    await leassetsFileUploadComponentsPage.clickOnCreateButton();

    await promise.all([
      leassetsFileUploadUpdatePage.setDescriptionInput('description'),
      leassetsFileUploadUpdatePage.setFileNameInput('fileName'),
      leassetsFileUploadUpdatePage.setPeriodFromInput('2000-12-31'),
      leassetsFileUploadUpdatePage.setPeriodToInput('2000-12-31'),
      leassetsFileUploadUpdatePage.setLeassetsFileTypeIdInput('5'),
      leassetsFileUploadUpdatePage.setDataFileInput(absolutePath),
      leassetsFileUploadUpdatePage.setUploadTokenInput('uploadToken'),
    ]);

    expect(await leassetsFileUploadUpdatePage.getDescriptionInput()).to.eq(
      'description',
      'Expected Description value to be equals to description'
    );
    expect(await leassetsFileUploadUpdatePage.getFileNameInput()).to.eq('fileName', 'Expected FileName value to be equals to fileName');
    expect(await leassetsFileUploadUpdatePage.getPeriodFromInput()).to.eq(
      '2000-12-31',
      'Expected periodFrom value to be equals to 2000-12-31'
    );
    expect(await leassetsFileUploadUpdatePage.getPeriodToInput()).to.eq('2000-12-31', 'Expected periodTo value to be equals to 2000-12-31');
    expect(await leassetsFileUploadUpdatePage.getLeassetsFileTypeIdInput()).to.eq(
      '5',
      'Expected leassetsFileTypeId value to be equals to 5'
    );
    expect(await leassetsFileUploadUpdatePage.getDataFileInput()).to.endsWith(
      fileNameToUpload,
      'Expected DataFile value to be end with ' + fileNameToUpload
    );
    const selectedUploadSuccessful = leassetsFileUploadUpdatePage.getUploadSuccessfulInput();
    if (await selectedUploadSuccessful.isSelected()) {
      await leassetsFileUploadUpdatePage.getUploadSuccessfulInput().click();
      expect(await leassetsFileUploadUpdatePage.getUploadSuccessfulInput().isSelected(), 'Expected uploadSuccessful not to be selected').to
        .be.false;
    } else {
      await leassetsFileUploadUpdatePage.getUploadSuccessfulInput().click();
      expect(await leassetsFileUploadUpdatePage.getUploadSuccessfulInput().isSelected(), 'Expected uploadSuccessful to be selected').to.be
        .true;
    }
    const selectedUploadProcessed = leassetsFileUploadUpdatePage.getUploadProcessedInput();
    if (await selectedUploadProcessed.isSelected()) {
      await leassetsFileUploadUpdatePage.getUploadProcessedInput().click();
      expect(await leassetsFileUploadUpdatePage.getUploadProcessedInput().isSelected(), 'Expected uploadProcessed not to be selected').to.be
        .false;
    } else {
      await leassetsFileUploadUpdatePage.getUploadProcessedInput().click();
      expect(await leassetsFileUploadUpdatePage.getUploadProcessedInput().isSelected(), 'Expected uploadProcessed to be selected').to.be
        .true;
    }
    expect(await leassetsFileUploadUpdatePage.getUploadTokenInput()).to.eq(
      'uploadToken',
      'Expected UploadToken value to be equals to uploadToken'
    );

    await leassetsFileUploadUpdatePage.save();
    expect(await leassetsFileUploadUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await leassetsFileUploadComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last LeassetsFileUpload', async () => {
    const nbButtonsBeforeDelete = await leassetsFileUploadComponentsPage.countDeleteButtons();
    await leassetsFileUploadComponentsPage.clickOnLastDeleteButton();

    leassetsFileUploadDeleteDialog = new LeassetsFileUploadDeleteDialog();
    expect(await leassetsFileUploadDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Leassets File Upload?');
    await leassetsFileUploadDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(leassetsFileUploadComponentsPage.title), 5000);

    expect(await leassetsFileUploadComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
