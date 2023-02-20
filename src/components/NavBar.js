import {CartIcon} from '../icons'
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotals } from '../features/cart/cartSlice'
import { useEffect } from 'react'


const NavBar = () => {
    const {amount} = useSelector((store) => store.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(calculateTotals())
    },[amount])
  return (
    <nav>
        <div className='nav-centre'>
            <h3>
                Rey Mall
            </h3>
            <div className='nav-container'>
                <CartIcon />
                <div className='amount-container'>
                    <p className='total-amount'>{amount}</p>
                </div>
            </div>

        </div>
    </nav>
    
  )
}

export default NavBar