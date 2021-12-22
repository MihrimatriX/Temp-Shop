import React, {useState} from "react";
import {Container, Image, Menu} from 'semantic-ui-react'
import CartSummary from "./CartSummary";
import SingOut from "./SingOut";
import SingIn from "./SingIn";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

export default function Navi() {

    const {cartItems} = useSelector(state => state.cart);
    const [isAuth, setIsAuth] = useState(true);

    const history = useHistory();

    function handleSignOut() {
        setIsAuth(false);
        history.push("/");
    }

    function handleSignIn() {
        setIsAuth(true);
    }

    return (
        <div>
            <Menu stackable fixed="top">
                <Container>
                    <Menu.Item>
                        <img src="https://react.semantic-ui.com/logo.png"/>
                    </Menu.Item>

                    <Menu.Item name="ANA SAYFA"/>
                    <Menu.Item name="VİTRİN"/>

                    <Menu.Menu position="right">
                        {cartItems.length > 0 && <CartSummary/>}
                        {isAuth ? <SingIn singOut={handleSignOut}/> : <SingOut singIn={handleSignIn}/>}
                    </Menu.Menu>
                </Container>

            </Menu>
        </div>
    );

}
