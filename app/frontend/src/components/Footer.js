import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Footer = (props) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://zamow-jedzenie.pl/">
                zamow-jedzenie.pl
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Footer;