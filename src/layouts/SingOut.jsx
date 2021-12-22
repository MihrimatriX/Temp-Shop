import React from "react";
import {Button, MenuItem} from "semantic-ui-react";

export default function SingOut({singIn}) {
    return (
        <div>
            <MenuItem>
                <Button primary onClick={singIn}>Giriş Yap</Button>
                <Button primary style={{marginLeft:"0.5em"}}>Kayıt Ol</Button>
            </MenuItem>
        </div>
    );
}
