import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('ShopStatus e2e test', () => {

    let navBarPage: NavBarPage;
    let shopStatusDialogPage: ShopStatusDialogPage;
    let shopStatusComponentsPage: ShopStatusComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ShopStatuses', () => {
        navBarPage.goToEntity('shop-status');
        shopStatusComponentsPage = new ShopStatusComponentsPage();
        expect(shopStatusComponentsPage.getTitle()).toMatch(/rainyApp.shopStatus.home.title/);

    });

    it('should load create ShopStatus dialog', () => {
        shopStatusComponentsPage.clickOnCreateButton();
        shopStatusDialogPage = new ShopStatusDialogPage();
        expect(shopStatusDialogPage.getModalTitle()).toMatch(/rainyApp.shopStatus.home.createOrEditLabel/);
        shopStatusDialogPage.close();
    });

    it('should create and save ShopStatuses', () => {
        shopStatusComponentsPage.clickOnCreateButton();
        shopStatusDialogPage.setMessageInput('message');
        expect(shopStatusDialogPage.getMessageInput()).toMatch('message');
        shopStatusDialogPage.shopSelectLastOption();
        shopStatusDialogPage.save();
        expect(shopStatusDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ShopStatusComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-shop-status div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ShopStatusDialogPage {
    modalTitle = element(by.css('h4#myShopStatusLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    messageInput = element(by.css('input#field_message'));
    shopSelect = element(by.css('select#field_shop'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setMessageInput = function (message) {
        this.messageInput.sendKeys(message);
    }

    getMessageInput = function () {
        return this.messageInput.getAttribute('value');
    }

    shopSelectLastOption = function () {
        this.shopSelect.all(by.tagName('option')).last().click();
    }

    shopSelectOption = function (option) {
        this.shopSelect.sendKeys(option);
    }

    getShopSelect = function () {
        return this.shopSelect;
    }

    getShopSelectedOption = function () {
        return this.shopSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
