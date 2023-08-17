import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Box = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
export const Main = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;
export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
`;
export const WrapperDetails = styled.View`
  width: 100%;
  padding: ${RFValue(20)}px;
`;
export const TitleDetails = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_200};

  margin-bottom: ${RFValue(14)}px;
`;
export const WapperTitleOrderNumber = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleOrderNumber = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const SubTitleOrderNumber = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WapperTitleAccomplished = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleAccomplished = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const SubTitleAccomplished = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WapperTitleDatePayment = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleDatePayment = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const SubTitleDatePayment = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WapperTitleToti = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TitleToti = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_200};
`;
export const SubTitleTitleToti = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.orange_100};
`;
export const Wrapper = styled.View`
  width: 100%;
  padding: ${RFValue(20)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(17)}px;
  color: ${({ theme }) => theme.colors.gray_200};
  font-weight: 500;
`;
export const WrapperProduct = styled.View`
  width: 100%;
  border: solid 1px ${({ theme }) => theme.colors.gray_25};

  padding: ${RFValue(20)}px;
`;
export const WrapperCardProduct = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const ImageProduct = styled.Image`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;

  border-radius: ${RFValue(50)}px;
`;
export const WrapperImage = styled.View`
  width: ${RFValue(60)}px;
  height: ${RFValue(60)}px;

  border: 4px solid orange;
  border-radius: ${RFValue(50)}px;

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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-left: ${RFValue(14)}px;
`;
export const TitleProductPont = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_90};
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
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const SubTitleQuantity = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray_90};
`;

export const WrapperValue = styled.View`
  width: 50%;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
export const TitleValue = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_90};
`;
export const SubTitleValue = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.orange_100};
`;

export const WrapperButton = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin-top: ${RFValue(14)}px;
  padding-left: ${RFValue(8)}px;
  padding-right: ${RFValue(8)}px;
`;
export const TitleButton = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.orange};
`;

export const WrapperButtonNext = styled.View`
  width: 100%;

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray_25};

  padding: ${RFValue(18)}px;
`;
export const TitleButtonNext = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.white};
`;
export const WrapperStatus = styled.View`
  width: 100%;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray_25};

  padding: ${RFValue(20)}px;
`;
export const TitleOrderStatus = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
`;
export const WrapperIconStatus = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;

  margin-top: ${RFValue(8)}px;
`;
export const TitleIconSeparation = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.gray_150};

  margin-left: ${RFValue(10)}px;
`;

export const WrapperAddress = styled.View`
  width: 100%;

  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
  margin-top: ${RFValue(8)}px;
  margin-bottom: ${RFValue(6)}px;
`;
export const WrapperAddressIcon = styled.View`
  flex-direction: row;
  align-items: center;

  margin-bottom: ${RFValue(6)}px;
`;
export const Titleddress = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};

  margin-bottom: ${RFValue(8)}px;
`;
export const SubTitleAddress = styled.Text`
  width: ${RFValue(286)}px;
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_150};

  margin-left: ${RFValue(8)}px;
`;
export const WrapperResumeValue = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  padding-left: ${RFValue(20)}px;
  padding-right: ${RFValue(20)}px;
`;
export const TitleResumeValue = styled.Text`
  font-size: ${RFValue(15)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray_150};
  margin-bottom: ${RFValue(8)}px;
`;
export const WrapperResumeValues = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;
export const SubTitleResumeValue = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.gray_150};

  margin-left: ${RFValue(8)}px;
`;
