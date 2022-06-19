const searchField = "input[name='search']";
const searchButton = ('.fa-search');
const itemName = "//div[@class='caption']";
        // const bookNameText = await page.textContent(bookName);

const SearchPanel = {
    findByText: async (page, text) => {
        await page.fill(searchField, text);
        await page.click(searchButton);
    },

    getSearchResultsText: async (page) => {
        const itemNameText = await page.textContent(itemName);
        return itemNameText;
    },
};

export default SearchPanel;