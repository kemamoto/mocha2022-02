import MainPage from "../pages/mainPage";
import searchPanel from "../elements/searchPanel";
import shoppingCart from "../pages/shoppingCart";
import bookmarks from "../pages/bookmarks";

const app = () => ({
    Main: () => ({...MainPage}),
    SearchPanel: () => ({...searchPanel}),
    ShoppingCart: () => ({...shoppingCart}),
    Bookmarks: () => ({...bookmarks}),
});

export default app;