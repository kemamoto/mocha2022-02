const emailField = "#input-email";
const passwordField = "#input-password";
const loginButton = 'input[value="Войти"]';

const MainPage = {
    login: async (page, email, password) => {
        await page.click(emailField);
        await page.fill(emailField, email);
        await page.click(passwordField);
        await page.fill(passwordField, password);
        await page.click(loginButton);
    },

};

export default MainPage;