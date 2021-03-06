import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Shop e2e test', () => {

    let navBarPage: NavBarPage;
    let shopDialogPage: ShopDialogPage;
    let shopComponentsPage: ShopComponentsPage;

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
        shopDialogPage.setShapeInput('shape');
        expect(shopDialogPage.getShapeInput()).toMatch('shape');
        shopDialogPage.skinSelectLastOption();
        shopDialogPage.setHighInput('5');
        expect(shopDialogPage.getHighInput()).toMatch('5');
        shopDialogPage.setWeightInput('5');
        expect(shopDialogPage.getWeightInput()).toMatch('5');
        shopDialogPage.setDistrictInput('district');
        expect(shopDialogPage.getDistrictInput()).toMatch('district');
        shopDialogPage.setSubdistrictInput('subdistrict');
        expect(shopDialogPage.getSubdistrictInput()).toMatch('subdistrict');
        shopDialogPage.setProvinceInput('province');
        expect(shopDialogPage.getProvinceInput()).toMatch('province');
        shopDialogPage.userSelectLastOption();
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
    shapeInput = element(by.css('input#field_shape'));
    skinSelect = element(by.css('select#field_skin'));
    highInput = element(by.css('input#field_high'));
    weightInput = element(by.css('input#field_weight'));
    districtInput = element(by.css('input#field_district'));
    subdistrictInput = element(by.css('input#field_subdistrict'));
    provinceInput = element(by.css('input#field_province'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    }

    setPic_coverInput = function(pic_cover) {
        this.pic_coverInput.sendKeys(pic_cover);
    }

    getPic_coverInput = function() {
        return this.pic_coverInput.getAttribute('value');
    }

    setTelInput = function(tel) {
        this.telInput.sendKeys(tel);
    }

    getTelInput = function() {
        return this.telInput.getAttribute('value');
    }

    setLine_unameInput = function(line_uname) {
        this.line_unameInput.sendKeys(line_uname);
    }

    getLine_unameInput = function() {
        return this.line_unameInput.getAttribute('value');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    }

    setAgeInput = function(age) {
        this.ageInput.sendKeys(age);
    }

    getAgeInput = function() {
        return this.ageInput.getAttribute('value');
    }

    setCategorySelect = function(category) {
        this.categorySelect.sendKeys(category);
    }

    getCategorySelect = function() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    }

    categorySelectLastOption = function() {
        this.categorySelect.all(by.tagName('option')).last().click();
    }
    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    }

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    }

    setShapeInput = function(shape) {
        this.shapeInput.sendKeys(shape);
    }

    getShapeInput = function() {
        return this.shapeInput.getAttribute('value');
    }

    setSkinSelect = function(skin) {
        this.skinSelect.sendKeys(skin);
    }

    getSkinSelect = function() {
        return this.skinSelect.element(by.css('option:checked')).getText();
    }

    skinSelectLastOption = function() {
        this.skinSelect.all(by.tagName('option')).last().click();
    }
    setHighInput = function(high) {
        this.highInput.sendKeys(high);
    }

    getHighInput = function() {
        return this.highInput.getAttribute('value');
    }

    setWeightInput = function(weight) {
        this.weightInput.sendKeys(weight);
    }

    getWeightInput = function() {
        return this.weightInput.getAttribute('value');
    }

    setDistrictInput = function(district) {
        this.districtInput.sendKeys(district);
    }

    getDistrictInput = function() {
        return this.districtInput.getAttribute('value');
    }

    setSubdistrictInput = function(subdistrict) {
        this.subdistrictInput.sendKeys(subdistrict);
    }

    getSubdistrictInput = function() {
        return this.subdistrictInput.getAttribute('value');
    }

    setProvinceInput = function(province) {
        this.provinceInput.sendKeys(province);
    }

    getProvinceInput = function() {
        return this.provinceInput.getAttribute('value');
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
