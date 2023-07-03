import { createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/catalog/about/AboutPage";
import ContactPage from "../../features/catalog/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage /> },
            {path: 'catalog', element: <Catalog /> },
            {path: 'catalog/:id', element: <ProductDetails /> },
            {path: 'about', element: <AboutPage /> },
            {path: 'contact', element: <ContactPage /> }
        ]
}
])