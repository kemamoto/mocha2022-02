const emailField = "#input-email";
const passwordField = "#input-password";
const loginButton = 'input[value="Войти"]';
const myAccount = "//div[@class='row']//div[@class='col-sm-9']//h2[1]";

const MainPage = {
    login: async (page, email, password) => {
        await page.click(emailField);
        await page.fill(emailField, email);
        await page.click(passwordField);
        await page.fill(passwordField, password);
        await page.click(loginButton);
    },
    getMyAccountText: async (page) => {
        const myAccountText = await page.textContent(myAccount);
        return myAccountText;
    },

};

export default MainPage;