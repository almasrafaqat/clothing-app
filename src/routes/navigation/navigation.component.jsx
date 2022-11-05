import { Fragment } from "react"
import { Outlet } from "react-router-dom"
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from "./navigation.styles";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
const Navigation = () => {
    const  currentUser  = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>
                    
                    {currentUser ? (<NavLink as="span" onClick={signOutUser} >
                        Sign out
                    </NavLink>) : (
                        <NavLink className="nav-link" to="/auth">
                            SING IN
                        </NavLink>)}

                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment >

    )
}


export default Navigation;