import chai from 'chai';
import {run, stop} from '../lib/browser';
const assert = chai.assert;

describe ('Авторизация', () => {
    let page;
    const passwordField = '#password';
    const profileNameField = '.navbar-end > .user > .dropdown > .base-button > .username';
    const usernameField = '#username';
    const loginButton = '.is-primary';

    beforeEach( async () => {
        page = await run('https://try.vikunja.io/');
    });
    afterEach(async() => {
        await stop();
    });

    it ('Авторизоваться демо пользователем', async () => {
        await page.click(usernameField);
        await page.fill(usernameField, 'demo');
        await page.click(passwordField);
        await page.fill(passwordField, 'demo');
        await page.click(loginButton);
        await page.waitForSelector(profileNameField);
        const profileNameText = await page.textContent(profileNameField);
        assert.strictEqual(profileNameText, 'demo', 'Имя пользователя не равно demo');
    });
});
