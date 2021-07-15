import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import db from '../../firebase'
import './PlansScreen.css'
import {loadStripe} from '@stripe/stripe-js'


const PlansScreen = () => {
    const [products,setProducts] = useState([])
    const user = useSelector(selectUser)
    const [subscription , setSubscription] = useState(null)

    useEffect(() => {
        db.collection('customers')
         .doc(user.uid)
         .collection("subscriptions")
         .get()
         .then(querySnapshot => {
            querySnapshot.forEach( async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end:  subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                })
            })
        })

    },[user.uid])

    console.log(subscription)
    useEffect(() => {
        db.collection("products")
        .where("active", "==", true)
        .get()
        .then((querySnapshot) => {
            const products ={}
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection
                ("prices").get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
            setProducts(products)
        })
    },[])

    console.log(products)

    const loadCheckout = async (priceId) => {
        const docRef = await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url:  window.location.origin
        })

        docRef.onSnapshot(async(snap) => {
            const {error,sessionId} = snap.data()
            
            if(error){
                alert(`An error occured : ${error.message}`)
            }
            if(sessionId){
                const stripe = await loadStripe('pk_test_51JBGtZLZ5OHmkM0t1m0ufGEEaBbtvD5l0zSEb8Qf2Obboq0KKM8IKFh2C4n92nV2oRvgfuQlUyLlyJRgjY7lb2b200TvEAMfIe')
                stripe.redirectToCheckout({sessionId})
            }
        })
    }
    return (
        <div className ="plansScreen">
            {subscription && <p>Renewal date: { new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId,productData]) =>{
                //TODO Add Some logic to check if user subscription is active
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)
                return(
                    <div  key ={productId} className ={`${isCurrentPackage && "planScreen_plan--disabled"} plansScreen__plan` }>
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description} </h6>
                        </div>
                        <button onClick ={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? 'Current Package': 'Subscribe'}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
