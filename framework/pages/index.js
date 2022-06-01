import CurrentPage from './currentPage';
import MainPage from '../pages/mainPage';
import RightMenu from '../elements/rightMenu';

const app = () => ({
    Home: () => ({...CurrentPage}),
    Main: () => ({...MainPage}),
})

export default app;
