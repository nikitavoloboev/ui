import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import colors from 'tailwindcss/colors';

/*
  Toast config that defines different layouts of the Toast component
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.green[500],
        borderLeftWidth: 3,
        borderRadius: 50,
        marginTop: 16,
      }}
      renderLeadingIcon={() => (
        <View className="flex flex-col items-center justify-center ml-4">
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={colors.green[500]}
          />
        </View>
      )}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ props }: { props: BaseToastProps }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
      <Text>{props.text1}</Text>
      <Text>{props.text2}</Text>
    </View>
  ),
};

export default function ToastProvider() {
  return <Toast config={toastConfig} />;
}
