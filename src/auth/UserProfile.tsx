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
            <Grid container spacing={2} direction="column" sx={{ justifyContent: "center", alignItems: "center", border: '3px solid #ccc', borderRadius: '8px', py: 15 }}>
                <Grid >
                    <Avatar sx={{ width: 80, height: 80 }} src={user?.picture} alt={user?.name} />
                </Grid>
                <Grid>
                    <Typography><strong>Name: </strong>{user?.name}</Typography>
                    <Typography><strong>Email:</strong> {user?.email}</Typography>
                </Grid>
            </Grid>
        )
    );
};

export default UserProfile;