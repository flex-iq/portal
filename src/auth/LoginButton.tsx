import { useAuth0 } from "@auth0/auth0-react";

import Button from '@mui/material/Button';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button sx={{ color: "white" }} size="large" onClick={() => loginWithRedirect()}>
        Log In
    </Button>;
};

export default LoginButton;