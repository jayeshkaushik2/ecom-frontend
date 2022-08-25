import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Home } from '../components/Home';
import { CategoryList } from '../components/CategoryList';
import { ItemsList } from '../components/ItemsList';
import { getFooter, getCartRefData } from '../context/Apis'
import Default from './Default'
import OrderList from './OrderList'
import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'
import Profile from './Profile'
import { ProductList } from './ProductList'

export const Checkout = (props) => {
    return (
        <>
            Text
        </>
    )
}