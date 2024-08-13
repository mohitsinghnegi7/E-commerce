import React, { useRef } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { homeCardData } from '../utils/homeCardData.js'
import CardFeature from '../component/CardFeature.jsx'
import { GrPrevious } from "react-icons/gr";
import { GrNext } from 'react-icons/gr' 
import { IoFilter } from "react-icons/io5";
import FilterProduct from '../component/FilterProduct.jsx'


const Home = () => {

  const [productArray, setProdcutArray] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterBy, setFilterBy] = useState("")
  
  const handleAllProduct = async()=>{
    const res = await axios.get("/api/v1/product/all-product")
    console.log(res.data.data);
    setProdcutArray(res.data.data)
    //console.log((productArray));
    
  }

  
  useEffect(()=>{
   handleAllProduct()
    
  },[])

  useEffect(() => {
   // console.log(productArray); // This should log the updated state
  }, [productArray]);
  const onlyData = productArray.slice(0,4)
  const homeProductCartListVegetables = productArray.filter(el=>el.category==="Vegetable")
  //console.log(homeProductCartListVegetables);
  const loadingArray = new Array(4).fill(null)
  const loadingArrayVeg = new Array(10).fill(null)
  
  const slideProduct = useRef()

  const nextProduct = ()=>{
    slideProduct.current.scrollLeft += 200
  }
  const previousProduct = ()=>{
    slideProduct.current.scrollLeft -= 200
  }

  const categoryList = [...new Set(productArray.map(el=>el.category))]
//console.log(categoryList);

useEffect(()=>{
  setFilterData(productArray)
},[productArray])


const handleFilterData = (category)=>{
  const  filter = productArray.filter(el=>el.category.toLowerCase()===category.toLowerCase())
  setFilterData(()=>{
    return [
      ...filter
    ]
  })
}

  return (
    <div className='p-2 md:p-4'>

      <div className='md:flex gap-4 py-2'>

        <div className='md:w-1/2'>
        <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
          <p className='text-sm font-medium text-slate-900'>
            Bike Delivery
          </p>
          <img src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' className='h-7'/>
        </div>
          <h2 className='text-3xl md:text-7xl font-bold py-3'>The Fastest Delivery in <span className='text-blue-600'>Your Home</span></h2>
          <p className='py-3 text-base max-w-lg'>E-Commerce or Electronic Commerce means buying and selling of goods, products, or services over the internet. E-commerce is also known as electronic commerce or internet commerce. These services provided online over the internet network. Transaction of money, funds, and data are also considered as E-commerce.</p>

        <button className='font-bold bg-blue-500 text-slate-200 px-4 py-1 rounded-md'>
          Order Now
        </button>

        </div>

        <div className='md:w-1/2 py-2 md:py-0 flex flex-wrap gap-5 p-4 justify-center'>
        {
        onlyData[0] ? ( onlyData.map((el,index)=>{
          return (
              <HomeCard key={index}
              id={el._id}
              productImage={el.productImage}
              name={el.name}
              price={el.price}
              category={el.category}
              />
          )
        })) :(
          loadingArray.map((el,index)=>{
            return (
              <HomeCard 
              key={index}
              loading={"Loading..."}
              />
            )
          })
        )
        }

        </div>
      </div>
        
        <div className=''>
          <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl text-slate-800 '>Fresh Vegetables</h2>
          <div className='flex items-center justify-center gap-3'>
            <button className='h-10 w-10 bg-slate-300 rounded-full text-xl font-bold flex justify-center items-center hover:bg-slate-400' onClick={previousProduct}><GrPrevious/></button>
            <button className='h-10 w-10 bg-slate-300 rounded-full text-xl font-bold flex justify-center items-center hover:bg-slate-400' onClick={nextProduct}><GrNext/></button>
          </div>
          </div>
          <div className='flex gap-5 mt-4 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProduct}>
            {
              homeProductCartListVegetables[0] ? (homeProductCartListVegetables.map((el)=>{
                return(
                  <CardFeature
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  productImage ={el.productImage}
                  />
                )
              })) :
              (loadingArrayVeg.map((el,index)=>{
                return(
                  <CardFeature key={index} loading={"Loading..."}/>
                )
              }))
            }
       
          </div>
        </div>

        <div>
          <div className='my-5'>
            <h2 className='font-bold text-2xl text-slate-800 '>Your Product</h2>

            <div className='flex gap-4 mt-4 justify-center'>
              {
                categoryList[0] && categoryList.map((el,ind)=>{
                  return(
                  <FilterProduct category={el} key={ind} onClick={()=>handleFilterData(el)}/>
                  )

                })
              }
         
            </div>

          </div>
        </div>

        <div className='flex flex-wrap justify-center gap-4'>
              {
                filterData.map((el,index)=>{
                  return (
                    <CardFeature
                    key={index}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    productImage={el.productImage}
                    price={el.price} />
                  )
                })
              }
        </div>

    </div>
  )
}

export default Home
