
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AdminLayout from './components/adminView/AdminLayout'
import AdminDashboard from './pages/adminView/AdminDashboard'
import AdminFeatures from './pages/adminView/AdminFeatures'
import AdminOrders from './pages/adminView/AdminOrders'
import AdminProducts from './pages/adminView/AdminProducts'
import ShoppingLayout from './components/shoppingView/ShoppingLayout'
import NotFound from './pages/notFound/NotFound'
import ShoppingHome from './pages/shoppingView/ShoppingHome'
import ShoppingList from './pages/shoppingView/ShoppingList'
import ShoppingCheckout from './pages/shoppingView/ShoppingCheckout'
import ShoppingAccount from './pages/shoppingView/ShoppingAccount'
import CheckAuth from './components/common/CheckAuth'
import { Unauth } from './pages/unauth/Unauth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthThunk } from './redux/authslice/authSlice'
import { Skeleton } from "@/components/ui/skeleton"
import ShoppingPaypalReturn from './pages/shoppingView/ShoppingPaypalReturn'
import ShoppingPaymentSuccess from './pages/shoppingView/ShoppingPaymentSuccess'
import ShoppingSearch from './pages/shoppingView/ShoppingSearch'

// import Navbar from './components/Navbar'
// import Footer from './components/Footer'

function App() {
  
  

  const{user, isAuthenticated, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(checkAuthThunk())
  }, [dispatch])

  if(isLoading) return <Skeleton className="w-[800px] h-[600px] bg-gray-200 rounded-lg shadow-lg animate-pulse" />


  return (
    <div className='flex flex-col overflow-hidden bg-white'>

      <Routes>

        {/**NOT FOUND URL */}
        <Route path='*' element={<NotFound/>} />

        {/**UNAUTH PAGE */}
        <Route path='/unauthpage' element={<Unauth/>} />


        <Route
        path='/'  element = {<CheckAuth isAuthenticated = {isAuthenticated} user = {user}><AuthLayout/></CheckAuth>} />
        

        {/** AUTH PATH(Login, Register) */}
        <Route path = "/auth" element = {<CheckAuth isAuthenticated = {isAuthenticated} user = {user}><AuthLayout/></CheckAuth>}>
          <Route path = "login" element = {<Login/>}/>
          <Route path = "register" element = {<Register/>}/>
        </Route>

        {/** ADMINVIEW ROUTES */}
        <Route path ="/admin" element = {<CheckAuth isAuthenticated = {isAuthenticated} user = {user}><AdminLayout/></CheckAuth>}>
          <Route path = "dashboard" element = {<AdminDashboard/>}/>
          <Route path = "features" element = {<AdminFeatures/>}/>
          <Route path = "orders" element = {<AdminOrders/>}/>
          <Route path = "products" element = {<AdminProducts/>}/>
        </Route> 


        {/**SHOPPINGVIEW ROUTES */}
        <Route path = "/shop" element = {<CheckAuth isAuthenticated = {isAuthenticated} user = {user}><ShoppingLayout/></CheckAuth>}>
          <Route path ="home" element ={<ShoppingHome/>}/>
          <Route path ="listing" element ={<ShoppingList/>}/>
          <Route path ="checkout" element ={<ShoppingCheckout/>}/>
          <Route path ="account" element ={<ShoppingAccount/>}/>
          <Route path ="paypal-return" element ={<ShoppingPaypalReturn/>}/>
          <Route path ="payment-success" element ={<ShoppingPaymentSuccess/>}/>
          <Route path ="search" element ={<ShoppingSearch/>}/>

        </Route>
      </Routes>


    </div>
  

  )
}

export default App