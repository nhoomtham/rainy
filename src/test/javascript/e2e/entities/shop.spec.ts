import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Shop e2e test', () => {

    let navBarPage: NavBarPage;
    let shopDialogPage: ShopDialogPage;
    let shopComponentsPage: ShopComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Shops', () => {
        navBarPage.goToEntity('shop');
        shopComponentsPage = new ShopComponentsPage();
        expect(shopComponentsPage.getTitle()).toMatch(/rainyApp.shop.home.title/);

    });

    it('should load create Shop dialog', () => {
        shopComponentsPage.clickOnCreateButton();
        shopDialogPage = new ShopDialogPage();
        expect(shopDialogPage.getModalTitle()).toMatch(/rainyApp.shop.home.createOrEditLabel/);
        shopDialogPage.close();
    });

    it('should create and save Shops', () => {
        shopComponentsPage.clickOnCreateButton();
        shopDialogPage.setNameInput('name');
        expect(shopDialogPage.getNameInput()).toMatch('name');
        shopDialogPage.setPic_coverInput('pic_cover');
        expect(shopDialogPage.getPic_coverInput()).toMatch('pic_cover');
        shopDialogPage.setTelInput('tel');
        expect(shopDialogPage.getTelInput()).toMatch('tel');
        shopDialogPage.setLine_unameInput('line_uname');
        expect(shopDialogPage.getLine_unameInput()).toMatch('line_uname');
        shopDialogPage.setDescriptionInput('description');
        expect(shopDialogPage.getDescriptionInput()).toMatch('description');
        shopDialogPage.setAgeInput('5');
        expect(shopDialogPage.getAgeInput()).toMatch('5');
        shopDialogPage.categorySelectLastOption();
        shopDialogPage.setPriceInput('5');
        expect(shopDialogPage.getPriceInput()).toMatch('5');
        shopDialogPage.save();
        expect(shopDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ShopComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-shop div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ShopDialogPage {
    modalTitle = element(by.css('h4#myShopLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    pic_coverInput = element(by.css('input#field_pic_cover'));
    telInput = element(by.css('input#field_tel'));
    line_unameInput = element(by.css('input#field_line_uname'));
    descriptionInput = element(by.css('input#field_description'));
    ageInput = element(by.css('input#field_age'));
    categorySelect = element(by.css('select#field_category'));
    priceInput = element(by.css('input#field_price'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setPic_coverInput = function (pic_cover) {
        this.pic_coverInput.sendKeys(pic_cover);
    }

    getPic_coverInput = function () {
        return this.pic_coverInput.getAttribute('value');
    }

    setTelInput = function (tel) {
        this.telInput.sendKeys(tel);
    }

    getTelInput = function () {
        return this.telInput.getAttribute('value');
    }

    setLine_unameInput = function (line_uname) {
        this.line_unameInput.sendKeys(line_uname);
    }

    getLine_unameInput = function () {
        return this.line_unameInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setAgeInput = function (age) {
        this.ageInput.sendKeys(age);
    }

    getAgeInput = function () {
        return this.ageInput.getAttribute('value');
    }

    setCategorySelect = function (category) {
        this.categorySelect.sendKeys(category);
    }

    getCategorySelect = function () {
        return this.categorySelect.element(by.css('option:checked')).getText();
    }

    categorySelectLastOption = function () {
        this.categorySelect.all(by.tagName('option')).last().click();
    }
    setPriceInput = function (price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function () {
        return this.priceInput.getAttribute('value');
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
