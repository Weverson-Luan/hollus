import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.white};
  flex: 1;
`;
export const WrapperText = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 12px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.gray_25};
`;
export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.gray_150};
`;
export const TitleMore = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.orange_100};
`;
export const WrapperInfoScheduling = styled.View`
  width: 100%;
  height: 180px;
  border-bottom-width: 1px;
  border-color: ${({theme}) => theme.colors.gray_25};
  padding: 12px;
`;
export const InfoLineScheduling = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const ContentIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextScheduling = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.black};
  margin-left: ${RFValue(10)}px;
`;
export const TextInfoValueScheduling = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.black};
`;
export const ContentIconCheck = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const TextSchedulingCheck = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.black};

  margin-left: ${RFValue(10)}px;
`;
export const TextInfoValueSchedulingCheck = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.green};
`;

export const ContentIconDie = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextInfoValueSchedulingDie = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.red};
`;

export const WrapperButton = styled.View`
  margin-top: ${RFValue(10)}px;
`;

export const TextTitleButton = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.orange_100};
`;

export const WrapperResume = styled.View`
  width: 100%;
  padding: 12px;
`;

export const InfoLineSchedulingMoney = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
export const ContentIconMoney = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextSchedulingMoney = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_150};

  margin-left: ${RFValue(10)}px;
`;

export const TextInfoValueSchedulingMoney = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_150};

  margin-left: ${RFValue(6)}px;
`;

export const TextInfoValueSchedulingClock = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_150};
  margin-left: ${RFValue(6)}px;
`;

export const InfoLineSchedulingClock = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 10px;
`;
export const ContentIconClock = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextSchedulingClock = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.gray_150};

  margin-left: ${RFValue(0)}px;
`;
export const FlatList = styled.FlatList``;
