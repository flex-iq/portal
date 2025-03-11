import { useAuth0 } from "@auth0/auth0-react";

import { Avatar, Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const UserProfile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Box>Loading ...</Box>;
    }

    return (
        isAuthenticated && (
            <Box sx={{ border: '3px solid #ccc', borderRadius: '8px', m: 10 }}>
                <Grid container spacing={2} direction="column" sx={{ m: 5, justifyContent: "center", alignItems: "center" }}>
                    <Grid >
                        <Avatar sx={{ width: 76, height: 76 }} src={user?.picture} alt={user?.name} />
                    </Grid>
                    <Grid>
                        <Typography><strong>Name: </strong>{user?.name}</Typography>
                        <Typography><strong>Email:</strong> {user?.email}</Typography>
                    </Grid>
                </Grid>

            </Box>
        )
    );
};

export default UserProfile;