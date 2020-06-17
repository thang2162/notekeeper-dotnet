import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

/*  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('notekeeper app is running!');
  }); */

  it('sbould create a user and delete a user', () => {
    page.navToUrl('#/signup');

    page.getElementByCss('input[type="email"]').sendKeys('netguy87@gmail.com');
    page.getElementByCss('input[type="password"]').sendKeys('123456');

    page.getElementByTag('button').click();


    browser.sleep(5000);

    page.getElementByCss('button[class="delete"]').click();

    browser.sleep(5000);

    page.navToUrl('#/login');

    browser.sleep(5000);

    page.getElementByCss('input[type="email"]').sendKeys('netguy87@gmail.com');
    page.getElementByCss('input[type="password"]').sendKeys('123456');

    page.getElementByTag('button').click();

    browser.sleep(5000);

    page.navToUrl('#/changepassword');

    browser.sleep(5000);

    page.getElementByBtnTxt('Delete Account').click();

    browser.sleep(5000);

    page.getElementByBtnTxt('Confirm Delete').click();;

    browser.sleep(5000);

    expect(page.getElementByCss('div[class="modal is-active"] p[class="modal-card-title"]').getText()).toEqual('Account Deleted');


  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
