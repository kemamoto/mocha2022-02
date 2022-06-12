const searchField = "input[name='search']";
const searchButton = ('.fa-search');
const goToBookmarks = "//span[contains(@class, 'hidden-xs hidden-sm hidden-md') and contains (text(), 'Закладки (1)')]";
const addButton = "//button[contains(@data-original-title, 'В закладки')]";


const bookmarks = {

    openBookmarks: async (page) => {
        await page.click(goToBookmarks);
    },

    addToBookmarks: async (page, itemName) => {
        await page.fill(searchField, itemName);
        await page.click(searchButton);
        await page.click(addButton);
    },

};

export default bookmarks;