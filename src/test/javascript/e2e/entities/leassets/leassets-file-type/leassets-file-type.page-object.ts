import { element, by, ElementFinder } from 'protractor';

export class LeassetsFileTypeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('gha-leassets-file-type div table .btn-danger'));
  title = element.all(by.css('gha-leassets-file-type div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class LeassetsFileTypeUpdatePage {
  pageTitle = element(by.id('gha-leassets-file-type-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  leassetsFileTypeNameInput = element(by.id('field_leassetsFileTypeName'));
  leassetsFileMediumTypeSelect = element(by.id('field_leassetsFileMediumType'));
  descriptionInput = element(by.id('field_description'));
  fileTemplateInput = element(by.id('file_fileTemplate'));
  leassetsfileTypeSelect = element(by.id('field_leassetsfileType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setLeassetsFileTypeNameInput(leassetsFileTypeName: string): Promise<void> {
    await this.leassetsFileTypeNameInput.sendKeys(leassetsFileTypeName);
  }

  async getLeassetsFileTypeNameInput(): Promise<string> {
    return await this.leassetsFileTypeNameInput.getAttribute('value');
  }

  async setLeassetsFileMediumTypeSelect(leassetsFileMediumType: string): Promise<void> {
    await this.leassetsFileMediumTypeSelect.sendKeys(leassetsFileMediumType);
  }

  async getLeassetsFileMediumTypeSelect(): Promise<string> {
    return await this.leassetsFileMediumTypeSelect.element(by.css('option:checked')).getText();
  }

  async leassetsFileMediumTypeSelectLastOption(): Promise<void> {
    await this.leassetsFileMediumTypeSelect.all(by.tagName('option')).last().click();
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setFileTemplateInput(fileTemplate: string): Promise<void> {
    await this.fileTemplateInput.sendKeys(fileTemplate);
  }

  async getFileTemplateInput(): Promise<string> {
    return await this.fileTemplateInput.getAttribute('value');
  }

  async setLeassetsfileTypeSelect(leassetsfileType: string): Promise<void> {
    await this.leassetsfileTypeSelect.sendKeys(leassetsfileType);
  }

  async getLeassetsfileTypeSelect(): Promise<string> {
    return await this.leassetsfileTypeSelect.element(by.css('option:checked')).getText();
  }

  async leassetsfileTypeSelectLastOption(): Promise<void> {
    await this.leassetsfileTypeSelect.all(by.tagName('option')).last().click();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class LeassetsFileTypeDeleteDialog {
  private dialogTitle = element(by.id('gha-delete-leassetsFileType-heading'));
  private confirmButton = element(by.id('gha-confirm-delete-leassetsFileType'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
