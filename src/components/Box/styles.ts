/**
 * IMPORTS
 */

import styled from "styled-components/native";
import { IBoxProps } from "./interface";
import { RFValue } from "react-native-responsive-fontsize"

const Container = styled.View<IBoxProps>`
  width: ${({ width })=> width ? width : `${width}%`};
  height: ${({ height })=> height ? `${height}px` : `${100}%`};
  background-color: ${({ backgroundColor })=> backgroundColor ? `${backgroundColor}` : `${'transparent'}`};
  flex-direction: ${({ flexDirection })=> flexDirection ? `${flexDirection}` : `${flexDirection}`};
  align-items: ${({ alignItems })=> alignItems ? `${alignItems}` : `${alignItems}`};
  justify-content: ${({ justifyContent })=> justifyContent ? `${justifyContent}` : `${justifyContent}`};
  border-width: ${({ borderWidth })=> borderWidth ? `${borderWidth}px` : `${0}px`};
  border-top-width: ${({ borderTopWidth })=> borderTopWidth ? `${borderTopWidth}px` : `${0}px`};
  border-radius: ${({ borderRadius })=> borderRadius ? `${borderRadius}px` : `${0}px`};
  border-color: ${({ borderColor })=> borderColor ? `${borderColor}` : `${'transparent'}`};
  padding:  ${({ padding })=> padding ? `${RFValue(padding)}px` : `${0}px`};
  padding-top:  ${({ paddingTop })=> paddingTop ? `${paddingTop}px` : `${0}px`};
  padding-left:  ${({ paddingLeft })=> paddingLeft ? `${paddingLeft}px` : `${0}px`};
  padding-right:  ${({ paddingRight })=> paddingRight ? `${paddingRight}px` : `${0}px`};
  padding-bottom:  ${({ paddingBottom })=> paddingBottom ? `${paddingBottom}px` : `${0}px`};
  margin:  ${({ margin })=> margin ? `${margin}px` : `${0}px`};
  margin-top:  ${({ marginTop })=> marginTop ? `${marginTop}px` : `${0}px`};
  margin-left: ${({ marginLeft })=> marginLeft ? `${marginLeft}px` : `${0}px`};
  margin-right: ${({ marginRight })=> marginRight ? `${marginRight}px` : `${0}px`};
  margin-bottom: ${({ marginBottom })=> marginBottom ? `${marginBottom}px` : `${0}px`};

`;



/**
 * EXPORTS
 */
export {
  Container
};