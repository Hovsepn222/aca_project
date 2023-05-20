import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store'
import NotFound from "./components/404handler";
import NavBarLayout from "./Layouts/outlet";
import Footer from './components/footer';
import Category from './components/category';
import SearchedItems from './components/searchedItems';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<NavBarLayout/>}>
            <Route index element={<App/>}/>
            <Route path="/category/:id" element={<Category/>} />
            <Route path="/search/:searchKeyword" element={<SearchedItems/>} />
            <Route path='*' element={<NotFound/>}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
            <Provider store={store}>
                <RouterProvider router={router}/>
                
                {/* Write Component Code Here */}


                <Footer />
            </Provider>
);