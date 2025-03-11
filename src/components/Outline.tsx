import { JSX } from 'react';

import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

// Used for loading screens
const Outline = (): JSX.Element => {
    return (
        <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>
            <Skeleton height="5rem" />
            <Skeleton variant="rectangular" height="20rem" />
            <Skeleton height="5rem" />
        </Container>
    );
};

export default Outline

// used for waiting for data to load
export const ListSkeleton = (): JSX.Element => {
    return (
        <Skeleton variant='text' width="100%" height={52} />
    )
}
