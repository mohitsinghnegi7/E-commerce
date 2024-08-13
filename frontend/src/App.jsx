import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom'
import HeaderPart from './component/HeaderPart.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { setDataProduct } from './redux/ProductSlice.jsx';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  const handleAllProduct = async()=>{
    const res = await axios.get("/api/v1/product/all-product")
   // console.log(res.data.data);
    dispatch(setDataProduct(res.data.data))
  }
  
  useEffect(()=>{
   handleAllProduct()
    
  },[])

  return (
    <>


   <ToastContainer/>
   <div className='fixed'>
   <HeaderPart/>
   </div>
   <main className='pt-16 bg-slate-200  '>
    <Outlet/>
   </main>
    </>
  )
}

export default App
