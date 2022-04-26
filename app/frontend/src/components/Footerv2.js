import { Container, Grid, Box, Link } from '@mui/material';
import Footer from './Footer';

export const Footerv2 = () => {
    return (
        <footer>
            <Box px={{ xs: 3, sm: 10 }} pt={{xs: 5, sm: 10}}>
                <Container maxWidth="lg">
                    {/* <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Help</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Contact
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Support
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Privacy
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Account</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Login
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    Register
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={1}>Messages</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    /user
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    /restaurantview
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    /health
                                </Link>
                            </Box>
                        </Grid>
                    </Grid> */}
                    <Box textAlign="center" pt={{ xs: 5, sm: 10}} pb={{ xs: 5, sm: 10}}>
                        <Footer />
                    </Box>
                </Container>
            </Box>
        </footer>
    );
}

export default Footerv2;