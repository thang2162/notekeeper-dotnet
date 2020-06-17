import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navToUrl(url: string) {
    return browser.get(url) as Promise<any>;
  }

  getElementByCss(css: string) {
    return element(by.css(css));
  }

  getElementByTag(tag: string) {
    return element(by.tagName(tag));
  }

  getElementByBtnTxt(txt: string) {
    return element(by.buttonText(txt));
  }

  getElementByBinding(name: string) {
    return element(by.binding(name)); 
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
