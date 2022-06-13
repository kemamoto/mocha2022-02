const searchField = "input[name='search']";
const searchButton = ('.fa-search');
const buyButton = "//div[@class='button-group']//span[contains(@class, 'hidden-xs hidden-sm hidden-md') and contains (text(), 'Купить')]";
const goToCart = "//span[contains(@class, 'hidden-xs hidden-sm hidden-md') and contains (text(), 'Корзина')]";
const removeButton = "//button[@data-original-title='Удалить']";
const cart = "//div[@id='content']//h1";
const cartItem = "//div[@class='table-responsive']//table[@class='table table-bordered']//tbody//tr//td[3]";
const emptyCart = "//div[@id='content']//p";

const shoppingCart = {

    openCart: async (page) => {
        await page.click(goToCart);
    },

    addItem: async (page, itemName) => {
        await page.fill(searchField, itemName);
        await page.click(searchButton);
        await page.click(buyButton);
    },

    removeItem: async (page) => {
        await page.click(goToCart);
        await page.click(removeButton);
    },

    getShopCartText: async (page) => {
        const cartText = await page.textContent(cart);
        return cartText;
    },

    getItemFromCartText: async (page) => {
        const carItemText = await page.textContent(cartItem);
        return carItemText;
    },

    getEmptyCartText: async (page) => {
        const emptyCartText = await page.textContent(emptyCart);
        return emptyCartText;
    },
};

export default shoppingCart;