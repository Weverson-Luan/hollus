/**
 * IMPORTS
 */
import React from 'react';
import {IBoxProps} from './interface';

import {Container} from './styles';

const Box = ({
  children,
  width,
  height,
  backgroundColor,
  flexDirection,
  alignItems,
  justifyContent,
  borderWidth,
  borderRadius,
  borderColor,
  padding,
  paddingTop,
  paddingLeft,
  paddingRight,
  paddingBottom,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  borderTopWidth,
  ...res
}: IBoxProps) => {
  return (
    <Container
      {...res}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      borderColor={borderColor}
      padding={padding}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingBottom={paddingBottom}
      margin={margin}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      borderTopWidth={borderTopWidth}>
      {children}
    </Container>
  );
};

/**
 * EXPORTS
 */
export {Box};
