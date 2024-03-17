import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useAuth } from '@/lib/auth/auth-context';
import EditScreenInfo from '@/lib/shared/edit-screen-info';

export default function ModalScreen() {
  const { signOut } = useAuth();

  return (
    <View className={styles.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text className={styles.title}>Modal</Text>
      <View className={styles.separator} />
      <EditScreenInfo path="app/modal.tsx" />
      <Button variant="plain" size="md" className="px-0" onPress={signOut}>
        <Text>Log out</Text>
      </Button>
    </View>
  );
}

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
