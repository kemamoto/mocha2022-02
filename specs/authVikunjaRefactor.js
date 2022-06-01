import chai from 'chai';
import {run, stop} from '../lib/browser';
import app from '../framework/pages';
const assert = chai.assert;

describe ('Авторизация', () => {
    let page;

    beforeEach( async () => {
        page = await run('https://try.vikunja.io/');
    });
    afterEach(async() => {
        await stop();
    });

    it ('Авторизоваться демо пользователем', async () => {
        await app().Main().login(page, 'demo', 'demo');
        const profileNameText = await app().Home().getProfileName();
        assert.strictEqual(profileNameText, 'demo', 'Имя пользователя не равно demo');
    });
});
