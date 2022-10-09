import './cart-item.syle.scss'

const CartItem = ({cartItem}) => {
    const { imageUrl, name, price, quantity } = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    Qty: {quantity} * {price}
                </span>
            </div>
        </div>
    );
}

export default CartItem;