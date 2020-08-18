import {AppPage} from './app.po';
import {browser, by, element} from 'protractor';

describe('evry survey App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('check title and welcome text', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('evry survey');
  });

  it('check welcome text', () => {
    const el = element(by.tagName('h1'));
    expect(el.getText()).toContain('Welcome to this Evry Survey');
  });

  it('navigate to new route', () => {
    const newCaseLink = element(by.css('.navigation-link'));
    newCaseLink.click();
    expect(element(by.tagName('h1')).getText()).toBe('You just navigated!');
  });
});
