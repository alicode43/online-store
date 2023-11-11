import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { fireDB } from '../../firebase/firebaseConfig';
import { QuerySnapshot, Timestamp, addDoc, collection, onSnapshot, onSnapshotsInSync, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
  const [mode, setMode]= useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode= ()=>{
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='rgb(17,24,39)';  
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });

 const addProduct =async ()=>{
    console.log(products);
  if (products.title === null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
    return toast.error('Please fill all fields');
  }
  console.log("hi");
  setLoading(true)
  try {
    const productRef = collection(fireDB, "products")
    await addDoc(productRef, products)
    toast.success("Product Add successfully")

    setTimeout(() => {
      window.location.href="/dashboard"
    }, 1000);

  
    getProductData()
    closeModal()
    setLoading(false)
  } catch (error) {
    console.log("error is"+error)
    setLoading(false)
  }
  setProducts("")
}
    
  
  const [product,setProduct]=useState([]);

  const getProductData = async ()=>{

    setLoading(true);

    try{
      const q=query(
        collection(fireDB, 'products'),
        orderBy('times')
      );
      const data=onSnapshot(q, (QuerySnapshot)=>{
        let productArray=[];
        QuerySnapshot.forEach((doc)=>{
          productArray.push({...doc.data(), id:doc.id});
        });

        setProduct(productArray);
        setLoading(false);
      });
    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
    
  }

useEffect(()=>{
  getProductData();
},[]);

  return (
    <MyContext.Provider value={ { toggleMode, mode, loading,setLoading ,products,setProducts,addProduct,product}}>
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState