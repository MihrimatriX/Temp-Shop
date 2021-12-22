import React from "react";
import {Dropdown, Image, Menu} from "semantic-ui-react";

export default function SingIn({singOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://i.pravatar.cc/100"/>

                <Dropdown pointing="top left" text="AFU">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={singOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    );
}
