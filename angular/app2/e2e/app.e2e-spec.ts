import { SampleprojectPage } from './app.po';

describe('sampleproject App', () => {
  let page: SampleprojectPage;

  beforeEach(() => {
    page = new SampleprojectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
