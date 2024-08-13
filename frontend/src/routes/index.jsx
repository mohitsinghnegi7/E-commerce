import {createBrowserRouter} from 'react-router-dom'
import Menu from '../pages/Menu'
import App from '../App.jsx'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import NewProduct from '../pages/NewProduct'
import About from '../pages/About'
import Signup from '../pages/Signup.jsx'
import Cart from '../pages/Cart.jsx'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "menu/:filterby",
                element : <Menu/>
            },
            {
                path : "contact",
                element : <Contact/>
            },
            {
                path : "signup",
                element :  <Signup/>
            },
            {
                path : "login",
                element : <Login/>,
            },
            {
                path : "newproduct",
                element : <NewProduct/>
            },
            {
                path : "about",
                element : <About/>
            },{
                path : "cart",
                element : <Cart/>
            }
        ]

    }
])


export default router