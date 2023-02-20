import React from 'react'
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import PaystackPop from "@paystack/inline-js";

const CartContainer = () => {
    const dispatch = useDispatch();
    const {cartItems, total, amount} = useSelector((state) => state.cart)
    if (amount < 1) {
        return <section className='cart'>
            <header>
                <h2>YOUR CART</h2>
                <h4 className='empty-cart'>Is Currently Empty.</h4>
            </header>
        </section>
    }

    const payWithPaystack = (e) =>{

        e.preventDefault()
        
        const paystack = new PaystackPop()
        paystack.newTransaction({
            
            key: "pk_test_87fd1308ce1e6bc2ec57a9998c8225e06e648036",
            amount: total * 100,
            email: "chimyelefue@gmail.com",
            firstname:"Chima",
            lastname: "Elefue",
            onSuccess(transaction){
                let message =  `Payment complete! Reference ${transaction.reference}`
                alert(message)
            },
            oncancel(){
                alert("Transaction cancelled!")
            }
        })
    }

  return (
    <section className='cart'>
        <header>
            <h2>YOUR CART</h2>
        </header>
        <div>
            {cartItems.map((item)=> {
              return  <CartItem key = {item.id} {...item} />
            })}
        </div>
        <footer>
            <hr />
            <div className='cart-total'>
            <h4>
                Total <span>₦{total.toFixed(2)}</span>
            </h4>
            </div>
            <div className='clickBtn' >
            <button className='btn clear-btn' onClick={()=> dispatch(openModal())}>
                Clear Cart
            </button>
            <button className='btn pay-btn' onClick={ payWithPaystack} >
                Pay
            </button>
            </div>
        </footer>
    </section>
  )
}

export default CartContainer