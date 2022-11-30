import styled from "styled-components"
import PropTypes from 'prop-types';

const sizesDesktop = {
    headingL: "32px",
    headingM: "28px",
    headingS: "13px"
}

const sizesMobile = {
    headingL: "24px",
    headingM: "20px",
    headingS: "11px"
}

const letterSpacingDesktop = {
    letterSpaceBig: "15px",
    letterSpaceSmall: "5px",
}

const letterSpacingMobile = {
    letterSpaceBig: "13.13px",
    letterSpaceSmall: "4.23px",
}

const colorFont = {
    dark: "rgba(22, 25, 50, 1)",
    light: "rgba(215, 224, 255, 1)",
}

const fontFamily = {
    kumbhSans: "'Kumbh Sans', sans-serif;",
    robotoSlab: "'Roboto Slab', serif",
    spaceMono: "'Space Mono', monospace",
}



const Heading = styled.h1`
    margin: 0;
    font-family: ${(props) => fontFamily[props.font]};
    font-size: ${(props) => sizesMobile[props.size]};
    font-weight: bold;
    letter-spacing: ${(props) => letterSpacingMobile[props.letter]};
    color: ${(props) => colorFont[props.color]};
    @media only screen and (min-width: 768px){
        font-size: ${(props) => sizesDesktop[props.size]};
        letter-spacing: ${(props) => letterSpacingDesktop[props.letter]};
    };
`

export default Heading;

Heading.propTypes = {
    size: PropTypes.oneOf(["headingXl", "headingL", "headingM", "headingS"]).isRequired,
    letter: PropTypes.oneOf(["letterSpaceBig", "letterSpaceSmall"]).isRequired,
}