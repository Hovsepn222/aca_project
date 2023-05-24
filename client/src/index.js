import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
import NotFound from "./components/404handler";
import NavBarLayout from "./Layouts/outlet";
import Footer from './components/footer';
import Category from './components/category';
import SearchedItems from './components/searchedItems';
import UserListings from './components/userListings';
import DeleteListing from './components/deleteListing';
import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import Logout from './components/logout';
import FavoriteItems from './components/favoriteItems';
import { ProductPage } from './components/productPage/ProductPage';
import ProfileView from './components/ProfileView';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<NavBarLayout />}>
            <Route index element={<App />}/>
            <Route path="/category/:id" element={<Category/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/item/:id' element={<ProductPage/>}/>
            <Route path='/profile' element={<ProfileView/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/mylistings' element={<UserListings/>}/>
            <Route path='/delete/:id' element={<DeleteListing/>}/>
            <Route path="/search/:searchKeyword" element={<SearchedItems/>}/>
            <Route path='/logout' element={<Logout/>}/>
            <Route path='/favorites' element={<FavoriteItems/>}/>
            <Route path='*' element={<NotFound />}/>
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
            <Provider store={store}>
                <RouterProvider router={router}/>
                <Footer />
            </Provider>
);