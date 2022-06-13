import chai from 'chai';
import playwright from 'playwright';
const assert = chai.assert;
import {run, stop} from "../lib/browser";
import app from "../framework/pages";

describe ("5 UI tests using Page Object approach", () => {
    let page;
    beforeEach (async () => {
        page = await run("http://www.qa2.ru/login");
    });

    afterEach(async () => {
        await stop();
    });

    test('Authorization', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        const account = await app().Main().getMyAccountText(page);
        assert.strictEqual(account, 'Моя учетная запись', 'Authorization failed');
    });
    
    test('Find a book', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().SearchPanel().findByText(page, "Книга домашнего умельца");
        const book = await app().SearchPanel().getSearchResultsText(page);
        assert.include(book, "Книга домашнего умельца", 'Book is not found');
        
    });

    test ('Open shopping cart', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().openCart(page);
        const cart = await  app().ShoppingCart().getShopCartText(page);
        assert.include(cart, 'Корзина покупок', 'Failed navigation to the Cart');
        
    });

    test('Add an item to the Cart', async () => {
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().addItem(page,"Новая мужская футболка от Smoke Rise");
        await app().ShoppingCart().openCart(page);
        const item = await app().ShoppingCart().getItemFromCartText(page);
        assert.strictEqual(item, "Новая мужская футболка от Smoke Rise", 'Item was not added');
        
    });

    test('Remove item from the Cart', async () => {
        const item = "Новая мужская футболка от Smoke Rise";
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().ShoppingCart().addItem(page, item);
        await app().ShoppingCart().removeItem(page);
        const emptyCart = await app().ShoppingCart().getEmptyCartText(page); 
        assert.strictEqual(emptyCart, "Корзина пуста!", 'Item was not removed');
        
    });

    test('Add an item to the Bookmarks', async () => {
        const item = "Книга домашнего умельца";
        await app().Main().login(page, "milecks@mail.ru", "d63mf44f!");
        await app().Bookmarks().addToBookmarks(page, item);
        page.reload();   
        await app().Bookmarks().openBookmarks(page);     
        const itemText = await app().Bookmarks().getBookmarkItemText(page);
        assert.include( itemText, item, 'Bookmark is not found');
        
    });

});