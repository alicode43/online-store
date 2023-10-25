import React from 'react'
import Layout from '../../components/layout/Layout'

function Order() {
  const context = useContext(myContext);
  const { name, rollno} = context;
  return (
    <Layout>
    Order
    <h1> Name : {name} </h1>
      <h1>Roll : {rollno} </h1>
    
    </Layout>
  )
}

export default Order