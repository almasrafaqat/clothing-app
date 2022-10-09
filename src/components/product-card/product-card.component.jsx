import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import './product-card.style.scss';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {  name, price, imageUrl } = product;
    const {addItemToCart } = useContext(CartContext);

    const AddProduct = () => {
        addItemToCart(product);
    }
    
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={name}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={AddProduct}>Add to Cart</Button>
        </div>
    );
};

export default ProductCard;