import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import theme from '../../../styles/colors/theme';

export const Main = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  /* flex: 1; */
  height: 100%;
`;
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const Wrapper = styled.View`
  width: 100%;
  padding: 14px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 500;
`;
export const WrapperProduct = styled.View`
  width: 100%;

  padding: 24px;

  border: solid 1px ${({ theme }) => theme.colors.gray_25};
`;
export const WrapperCardProduct = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const ImageProduct = styled.Image`
  width: 60px;
  height: 60px;

  border-radius: 50px;
`;
export const WrapperImage = styled.View`
  border: 4px solid orange;
  border-radius: 50px;
  width: 65px;
  height: 65px;
  align-items: center;
  justify-content: center;
`;
export const WrapperImageProduct = styled.View`
  width: 100%;
  padding: 24px;
`;
export const WrapperInfoProduct = styled.View`
  width: 70%;
`;
export const TitleProduct = styled.Text`
  color: ${({ theme }) => theme.colors.gray_150};
  font-size: ${RFValue(17)}px;
`;
export const WrapperPont = styled.View`
  /* width: 100%; */
  flex-direction: row;
  margin-left: ${RFValue(14)}px;
  align-items: center;
  justify-content: space-around;
`;
export const TitleProductPont = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  font-size: ${RFValue(14)}px;
  margin-left: ${RFValue(6)}px;
`;
export const WrapperTitleSpace = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const TitleSpace = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  margin-left: ${RFValue(8)}px;
`;
export const WrapperSpace = styled.View`
  width: 100%;
  flex-direction: row;
`;

export const WrapperResume = styled.View`
  width: 100%;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  margin-top: ${RFValue(14)}px;
`;
export const WrapperQuantity = styled.View`
  width: 40%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const TitleQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(16)}px;
`;
export const SubTitleQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
  font-weight: bold;
`;

export const WrapperValue = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const TitleValue = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(16)}px;
`;
export const SubTitleValue = styled.Text`
  color: ${({ theme }) => theme.colors.orange_100};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
`;

export const WrapperButton = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: ${RFValue(16)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
`;
export const TitleButton = styled.Text`
  color: ${({ theme }) => theme.colors.orange};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(16)}px;
  font-weight: normal;
`;

export const WrapperButtonNext = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  background-color: ${theme.colors.white};
  margin-top: ${RFValue(40)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
  /* flex: 1; */

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};
`;
export const TitleButtonNext = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(16)}px;
  font-weight: normal;
`;
export const WrapperResumeValue = styled.View`
  width: 100%;
  /* flex-direction: row; */
  /* align-items: center;
  justify-content: space-around; */
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;
export const TitleResumeValue = styled.Text`
  color: ${({ theme }) => theme.colors.gray_200};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(18)}px;
  font-weight: normal;
  margin-bottom: 8px;
`;

export const WrapperText = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.orange};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
  font-weight: normal;
`;
export const PriceFret = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
  font-weight: normal;
`;
export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.gray_90};
  /* margin-left: ${RFValue(8)}px; */
  font-size: ${RFValue(14)}px;
  font-weight: normal;
`;
