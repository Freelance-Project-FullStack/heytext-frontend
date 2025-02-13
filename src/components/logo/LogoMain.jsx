// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <svg width="118" height="35" viewBox="0 0 118 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="25" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="black">H</text>
        <text x="30" y="25" fontFamily="Arial, sans-serif" fontSize="16" fill="black">heytext</text>
      </svg>
    </>
  );
};

export default Logo;
