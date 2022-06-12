const searchField = "input[name='search']";
const searchButton = ('.fa-search');

const searchPanel = {
    findByText: async (page, text) => {
        await page.fill(searchField, text);
        await page.click(searchButton);
    },

};

export default searchPanel;