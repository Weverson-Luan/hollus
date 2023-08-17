import * as React from "react";
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    viewBox="0 0 84 96.52"
    {...props}
  >
    <G data-name="Grupo 6">
      <G data-name="Grupo 5">
        <G data-name="Grupo 4" fill="none">
          <G
            data-name="Ret\xE2ngulo 1"
            transform="translate(0 48.022)"
            stroke={props.color}
            strokeWidth={3}
          >
            <Rect width={84} height={10} rx={4} stroke="none" />
            <Rect x={1} y={1} width={82} height={8} rx={3} />
          </G>
          <G data-name="Grupo 3">
            <G data-name="Interse\xE7\xE3o 1">
              <Path d="M8.5 49.022h67C73.979 21.544 59.561 0 42 0S10.021 21.544 8.5 49.022Z" />
              <Path
                d="M73.36 47.022c-.984-12.174-4.592-23.36-10.25-31.692-2.885-4.249-6.167-7.562-9.755-9.848C49.727 3.172 45.907 2 42 2s-7.727 1.172-11.355 3.482c-3.588 2.286-6.87 5.6-9.755 9.848-5.658 8.332-9.266 19.518-10.25 31.692h62.72m2.14 2h-67C10.021 21.544 24.439 0 42 0s31.979 21.544 33.5 49.022Z"
                fill={props.color}
              />
            </G>
            <G data-name="Interse\xE7\xE3o 2">
              <Path d="M14.408 49.022h55.183C68.338 26.454 56.464 8.754 42 8.754s-26.339 17.7-27.592 40.268Z" />
              <Path
                d="M67.444 47.022c-.85-9.788-3.783-18.768-8.348-25.473-2.349-3.45-5.017-6.138-7.932-7.989-2.93-1.862-6.014-2.806-9.164-2.806-3.15 0-6.234.944-9.165 2.806-2.914 1.851-5.583 4.54-7.932 7.99-4.565 6.704-7.499 15.684-8.348 25.472h50.89m2.146 2H14.408C15.661 26.45 27.536 8.754 42 8.754c14.464 0 26.338 17.697 27.591 40.268Z"
                fill={props.color}
              />
            </G>
          </G>
          <Path
            data-name="Caminho 1"
            d="M5.813 57.522s-1.5 11.449 0 21.2a59.451 59.451 0 0 0 6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 2"
            d="M78.187 57.522s1.5 11.449 0 21.2a59.451 59.451 0 0 1-6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Linha 1"
            stroke={props.color}
            strokeWidth={3}
            d="M8.5 96.522h67"
          />
          <Path
            data-name="Caminho 3"
            d="M5.813 57.522s-1.5 11.449 0 21.2a59.451 59.451 0 0 0 6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 4"
            d="M17.813 57.522s-1.5 11.449 0 21.2a59.451 59.451 0 0 0 6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 5"
            d="M33.637 57.94s-4.324 11.031-2.824 20.782a59.451 59.451 0 0 0 6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 6"
            d="M68.146 57.522s1.5 11.449 0 21.2a59.451 59.451 0 0 1-6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 7"
            d="M53.065 58.053s3.581 10.918 2.081 20.669a59.451 59.451 0 0 1-6 17.8"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 8"
            d="M5.5 65.522a280.7 280.7 0 0 0 37.106 2.908A251.619 251.619 0 0 0 78.5 65.522"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 9"
            d="M5.5 74.114a280.7 280.7 0 0 0 37.106 2.908A251.619 251.619 0 0 0 78.5 74.114"
            stroke={props.color}
            strokeWidth={3}
          />
          <Path
            data-name="Caminho 10"
            d="M6.5 84.522a264.928 264.928 0 0 0 36.035 2.908 237.5 237.5 0 0 0 34.859-2.908"
            stroke={props.color}
            strokeWidth={3}
          />
        </G>
      </G>
    </G>
  </Svg>
);

export { SvgComponent as BalaioSVGComponent };
