import { useState } from 'react'
import './style.scss'
import {
  RouterProvider,
  createBrowserRouter,
  Outlet
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Nav from './components/nav/Nav'
import Home from './pages/home/Home'
import Gigs from './pages/gigs/Gigs';
import Footer from './components/footer/Footer';
import SingleGig from './pages/single_gig/SingleGig';
import MyGigs from './pages/myGigs/MyGigs';
import Add from './pages/add/Add';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import ResSliderPage from './pages/resSliderPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RegisterDone from './pages/register_done/RegisterDone';
import Payment from './pages/payment/Payment';
import Success from './pages/success/Success';


function App() {

  const queryClient = new QueryClient()
  
  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Nav/>
          <Outlet/>
          <Footer/>
        </QueryClientProvider>
      </>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/gigs',
          element: <Gigs/>
        },
        {
          path: '/single/:id',
          element: <SingleGig/>
        },
        {
          path: '/mygigs/:usrId',
          element: <MyGigs/>
        },
        {
          path: '/adding',
          element: <Add/>
        },
        {
          path: '/orders/:usrId',
          element: <Orders/>
        },
        {
          path: '/messages/:usrId',
          element: <Messages/>
        },
        {
          path: '/message/:id',
          element: <Message/>
        },
        {
          path: '/slider',
          element: <ResSliderPage/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/payment/:id',
          element: <Payment/>
        },
        {
          path: '/success',
          element: <Success/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/registerdone',
          element: <RegisterDone/>
        },
      ]
    },
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
