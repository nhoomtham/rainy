import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('User_favorite e2e test', () => {

    let navBarPage: NavBarPage;
    let user_favoriteDialogPage: User_favoriteDialogPage;
    let user_favoriteComponentsPage: User_favoriteComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load User_favorites', () => {
        navBarPage.goToEntity('user-favorite');
        user_favoriteComponentsPage = new User_favoriteComponentsPage();
        expect(user_favoriteComponentsPage.getTitle()).toMatch(/rainyApp.user_favorite.home.title/);

    });

    it('should load create User_favorite dialog', () => {
        user_favoriteComponentsPage.clickOnCreateButton();
        user_favoriteDialogPage = new User_favoriteDialogPage();
        expect(user_favoriteDialogPage.getModalTitle()).toMatch(/rainyApp.user_favorite.home.createOrEditLabel/);
        user_favoriteDialogPage.close();
    });

   /* it('should create and save User_favorites', () => {
        user_favoriteComponentsPage.clickOnCreateButton();
        user_favoriteDialogPage.userSelectLastOption();
        user_favoriteDialogPage.shopSelectLastOption();
        user_favoriteDialogPage.save();
        expect(user_favoriteDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class User_favoriteComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-favorite div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class User_favoriteDialogPage {
    modalTitle = element(by.css('h4#myUser_favoriteLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    userSelect = element(by.css('select#field_user'));
    shopSelect = element(by.css('select#field_shop'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function() {
        return this.userSelect;
    }

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    shopSelectLastOption = function() {
        this.shopSelect.all(by.tagName('option')).last().click();
    }

    shopSelectOption = function(option) {
        this.shopSelect.sendKeys(option);
    }

    getShopSelect = function() {
        return this.shopSelect;
    }

    getShopSelectedOption = function() {
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
