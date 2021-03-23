import { element, by, ElementFinder } from 'protractor';

export class FixedAssetAcquisitionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('gha-fixed-asset-acquisition div table .btn-danger'));
  title = element.all(by.css('gha-fixed-asset-acquisition div h2#page-heading span')).first();
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

export class FixedAssetAcquisitionUpdatePage {
  pageTitle = element(by.id('gha-fixed-asset-acquisition-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  assetNumberInput = element(by.id('field_assetNumber'));
  serviceOutletCodeInput = element(by.id('field_serviceOutletCode'));
  assetTagInput = element(by.id('field_assetTag'));
  assetDescriptionInput = element(by.id('field_assetDescription'));
  purchaseDateInput = element(by.id('field_purchaseDate'));
  assetCategoryInput = element(by.id('field_assetCategory'));
  purchasePriceInput = element(by.id('field_purchasePrice'));
  fileUploadTokenInput = element(by.id('field_fileUploadToken'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setAssetNumberInput(assetNumber: string): Promise<void> {
    await this.assetNumberInput.sendKeys(assetNumber);
  }

  async getAssetNumberInput(): Promise<string> {
    return await this.assetNumberInput.getAttribute('value');
  }

  async setServiceOutletCodeInput(serviceOutletCode: string): Promise<void> {
    await this.serviceOutletCodeInput.sendKeys(serviceOutletCode);
  }

  async getServiceOutletCodeInput(): Promise<string> {
    return await this.serviceOutletCodeInput.getAttribute('value');
  }

  async setAssetTagInput(assetTag: string): Promise<void> {
    await this.assetTagInput.sendKeys(assetTag);
  }

  async getAssetTagInput(): Promise<string> {
    return await this.assetTagInput.getAttribute('value');
  }

  async setAssetDescriptionInput(assetDescription: string): Promise<void> {
    await this.assetDescriptionInput.sendKeys(assetDescription);
  }

  async getAssetDescriptionInput(): Promise<string> {
    return await this.assetDescriptionInput.getAttribute('value');
  }

  async setPurchaseDateInput(purchaseDate: string): Promise<void> {
    await this.purchaseDateInput.sendKeys(purchaseDate);
  }

  async getPurchaseDateInput(): Promise<string> {
    return await this.purchaseDateInput.getAttribute('value');
  }

  async setAssetCategoryInput(assetCategory: string): Promise<void> {
    await this.assetCategoryInput.sendKeys(assetCategory);
  }

  async getAssetCategoryInput(): Promise<string> {
    return await this.assetCategoryInput.getAttribute('value');
  }

  async setPurchasePriceInput(purchasePrice: string): Promise<void> {
    await this.purchasePriceInput.sendKeys(purchasePrice);
  }

  async getPurchasePriceInput(): Promise<string> {
    return await this.purchasePriceInput.getAttribute('value');
  }

  async setFileUploadTokenInput(fileUploadToken: string): Promise<void> {
    await this.fileUploadTokenInput.sendKeys(fileUploadToken);
  }

  async getFileUploadTokenInput(): Promise<string> {
    return await this.fileUploadTokenInput.getAttribute('value');
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

export class FixedAssetAcquisitionDeleteDialog {
  private dialogTitle = element(by.id('gha-delete-fixedAssetAcquisition-heading'));
  private confirmButton = element(by.id('gha-confirm-delete-fixedAssetAcquisition'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
