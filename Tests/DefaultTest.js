const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('DefaultTest', () => {
    const driver = global.driver
        ? global.driver
        : new Builder().forBrowser('chrome').build();

    it('should go to nehalist.io and check the title', async () => {
        await driver.get('https://www.google.com');
        await driver.sleep(20000);
        await driver.findElement(By.name('q')).sendKeys('nehalist', Key.ENTER);
        await driver.wait(until.elementLocated(By.id('search')));
        await driver.findElement(By.linkText('nehalist.io')).click();
        const title = await driver.getTitle();

        expect(title).to.equal('nehalist.io');
    });

    it('should go to nehalist.io and check social icons in nav bar', async () => {
        await driver.get('https://nehalist.io');
        const twitterLink = await driver.findElement(By.className('social-link-twitter')).getAttribute('href');
        const githubLink  = await driver.findElement(By.className('social-link-github')).getAttribute('href');

        expect(twitterLink).to.equal('https://twitter.com/nehalist');
        expect(githubLink).to.equal('https://github.com/nehalist');
    });

    after(async () => driver.quit());
});
