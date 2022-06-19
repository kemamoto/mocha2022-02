import MainPage from "./mainPage";
import SearchPanel from "../elements/searchPanel";
import ShoppingCart from "./shoppingCart";
import Bookmarks from "./bookmarks";

const app = () => ({
    Main: () => ({...MainPage}),
    SearchPanel: () => ({...SearchPanel}),
    ShoppingCart: () => ({...ShoppingCart}),
    Bookmarks: () => ({...Bookmarks}),
});

export default app;