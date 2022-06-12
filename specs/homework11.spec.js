import chai from 'chai';
import playwright from 'playwright';
const assert = chai.assert;

describe ("5 UI tests", () => {
    let browser, context, page;
    beforeEach (async () => {
        browser = await playwright.chromium.launch (
            {
                headless: false,
                slowMo: 50
            }
            
        );
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto("https://automationteststore.com/index.php?rt=account/login");
    });

    afterEach(async () => {
        await page.screenshot({path: 'screen1.png'});
        await page.close();
        await browser.close();

    });

    test('Authorization', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "milecks");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "d63mf44f!");
        await page.locator('button', { hasText: 'Login' }).click();
        const menuItem = '.dropdown > .menu_account > .menu_text';
        const menuText = await page.textContent(menuItem);
        assert.strictEqual(menuText, 'Welcome back Alex', 'Error');
    });

    test('Find goods', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "milecks");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "d63mf44f!");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "shoes");
        await page.click(".button-in-search");
        const shoesName = '.productname > .bgnone';
        const shoesNameText = await page.textContent(shoesName);
        assert.strictEqual(shoesNameText, 'Womens high heel point toe stiletto sandals ankle strap court shoes', 'Error');
    });

    test('Add to the Cart', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "milecks");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "d63mf44f!");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "ck one shock for him Deodorant");
        await page.click(".button-in-search");
        await page.click(".fa-cart-plus");
        await page.waitForSelector('.maintext > .fa-shopping-cart');
        const name = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a";
        const model = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[3]";
        const unitPrice = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[4]";
        const nameText = await page.textContent(name);
        const modelText = await page.textContent(model);
        const unitPriceText = await page.textContent(unitPrice);
        assert.strictEqual(nameText, 'ck one shock for him Deodorant', 'Error');
        assert.strictEqual(modelText, '601232', 'Error');
        assert.strictEqual(unitPriceText, '$14.00', 'Error');
    });

    test('Remove from the Cart', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "milecks");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "d63mf44f!");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click("#filter_keyword");
        await page.fill("#filter_keyword", "ck one shock for him Deodorant");
        await page.click(".button-in-search");
        await page.click(".fa-cart-plus");
        await page.waitForSelector('.maintext > .fa-shopping-cart');
        await page.waitForSelector("//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a");
        await page.click("//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[7]//a");
        const empty = '.contentpanel';
        const emptyText = await page.textContent(empty);
        //Не понимаю почему нижняя строчка не отрабатывает, хочу проверить, что конкретного элемента нет на странице...
        //assert.notExists("//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a");
        //const isNot = "//div[@class='container-fluid cart-info product-list']//table[@class='table table-striped table-bordered']//tr[position() = 2]//td[2]//a";
        assert.include(emptyText, 'Your shopping cart is empty!', 'Error');
      
    });

    test('Check that we can change currency ', async () => {
        await page.click("#loginFrm_loginname");
        await page.fill("#loginFrm_loginname", "milecks");
        await page.click("#loginFrm_password");
        await page.fill("#loginFrm_password", "d63mf44f!");
        await page.locator('button', { hasText: 'Login' }).click();
        await page.click('.block_6 > .language > .hover > .dropdown-toggle');
        await page.click("//ul[@class='dropdown-menu currency']//li[1]//a");
        const currency = '.block_6 > .language > .hover > .dropdown-toggle';
        const currencyText = await page.textContent(currency);
        assert.strictEqual(currencyText, '€ Euro', 'Error');
    });
    
});