import chai from 'chai';
import playwright from 'playwright';
const assert = chai.assert;
import {run, stop} from "../lib/browser";
import app from "../framework/pages";

describe ("5 UI tests using Page Object approach", () => {
    let page;
    const emailField = "#input-email";
    const passwordField = "#input-password";
    const loginButton = 'input[value="Войти"]';
    beforeEach (async () => {
        page = await run("http://www.qa2.ru/login");
    });

    afterEach(async () => {
        await stop();
    });

    test('Authorization', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        const myAccount = "//div[@class='row']//div[@class='col-sm-9']//h2[1]";
        const myAccountText = await page.textContent(myAccount);
        assert.strictEqual(myAccountText, 'Моя учетная запись', 'Authorization failed');
    });
    
    test('Find a book', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().SearchPanel().findByText(page, "Книга домашнего умельца");
        const bookName = "//div[@class='caption']";
        const bookNameText = await page.textContent(bookName);
        assert.include( bookNameText, 'Книга домашнего умельца', 'Book is not found');
        
    });

    test ('Open shopping cart', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().openCart(page);
        const Cart = await page.textContent("//div[@id='content']//h1");
        assert.include(Cart, 'Корзина покупок', 'Failed navigation to the Cart');
        
    });

    test('Add an item to the Cart', async () => {
        const item = "Новая мужская футболка от Smoke Rise";
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().addItem(page, item);
        await app().ShoppingCart().openCart(page);
        const itemNameText = await page.textContent("//div[@class='table-responsive']//table[@class='table table-bordered']//tbody//tr//td[3]");
        assert.strictEqual(itemNameText, item, 'Item was not added');
        
    });

    test('Remove item from the Cart', async () => {
        const item = "Новая мужская футболка от Smoke Rise";
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().addItem(page, item);
        await app().ShoppingCart().removeItem(page);
        const emptyCart = await page.textContent("//div[@id='content']//p");
        assert.strictEqual(emptyCart, "Корзина пуста!", 'Item was not removed');
        
    });

    test('Add an item to the Bookmarks', async () => {
        const item = "Книга домашнего умельца";
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().Bookmarks().addToBookmarks(page, item);
        page.reload();   
        await app().Bookmarks().openBookmarks(page);     
        const itemText = await page.textContent("//div[@id='content']//table[@class='table table-bordered table-hover']//tbody//tr//td[2]//a");
        assert.include( itemText, item, 'Bookmark is not found');
        
    });

});