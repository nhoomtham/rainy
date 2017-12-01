import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Album e2e test', () => {

    let navBarPage: NavBarPage;
    let albumDialogPage: AlbumDialogPage;
    let albumComponentsPage: AlbumComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Albums', () => {
        navBarPage.goToEntity('album');
        albumComponentsPage = new AlbumComponentsPage();
        expect(albumComponentsPage.getTitle()).toMatch(/rainyApp.album.home.title/);

    });

    it('should load create Album dialog', () => {
        albumComponentsPage.clickOnCreateButton();
        albumDialogPage = new AlbumDialogPage();
        expect(albumDialogPage.getModalTitle()).toMatch(/rainyApp.album.home.createOrEditLabel/);
        albumDialogPage.close();
    });

    it('should create and save Albums', () => {
        albumComponentsPage.clickOnCreateButton();
        albumDialogPage.setUrlInput('url');
        expect(albumDialogPage.getUrlInput()).toMatch('url');
        albumDialogPage.shopSelectLastOption();
        albumDialogPage.save();
        expect(albumDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AlbumComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-album div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AlbumDialogPage {
    modalTitle = element(by.css('h4#myAlbumLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    urlInput = element(by.css('input#field_url'));
    shopSelect = element(by.css('select#field_shop'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setUrlInput = function (url) {
        this.urlInput.sendKeys(url);
    }

    getUrlInput = function () {
        return this.urlInput.getAttribute('value');
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
