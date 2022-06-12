const searchField = "input[name='search']";
const searchButton = ('.fa-search');
const buyButton = "//div[@class='button-group']//span[contains(@class, 'hidden-xs hidden-sm hidden-md') and contains (text(), 'Купить')]";
const goToCart = "//span[contains(@class, 'hidden-xs hidden-sm hidden-md') and contains (text(), 'Корзина')]";
const removeButton = "//button[@data-original-title='Удалить']";


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

};

export default shoppingCart;