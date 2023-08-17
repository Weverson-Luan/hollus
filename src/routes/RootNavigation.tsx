import {createNavigationContainerRef} from '@react-navigation/native';

export const rootNavigationRef = createNavigationContainerRef();

export function navigate(name: any, params: any) {
  if (rootNavigationRef.isReady()) {
    //@ts-ignore
    rootNavigationRef.navigate(name, params);
  }
}
