import { Icon } from '@/icons';
import { cn } from '@/lib/utils';
import { COLORS } from '@/theme/colors';
import { DrawerActions } from '@react-navigation/native';
import { Link, Stack, useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Platform, Pressable, View } from 'react-native';

export default function ComponentsLayout() {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="components"
        options={{
          headerTransparent: Platform.OS === 'ios',
          headerLargeStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000000EE' : '#FFFFFFEE',
          },
          headerBlurEffect:
            colorScheme === 'dark'
              ? 'systemUltraThinMaterialDark'
              : 'systemUltraThinMaterialLight',
          headerLargeTitle: true,
          title: 'Components',
          headerSearchBarOptions: {
            placeholder: 'Search...',
            barTintColor: colorScheme === 'dark' ? COLORS.black : COLORS.white,
            textColor: colorScheme === 'dark' ? COLORS.white : COLORS.black,
            headerIconColor:
              colorScheme === 'dark' ? COLORS.white : COLORS.black,
            hintTextColor: COLORS[colorScheme].grey,
          },
          headerLeft: () => (
            <Pressable
              className="opacity-80 android:pr-4"
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}>
              {({ pressed }) => (
                <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
                  <Icon
                    name="rectangleLeftThirdInsetFill"
                    color={colorScheme === 'dark' ? COLORS.white : COLORS.black}
                    size={20}
                  />
                </View>
              )}
            </Pressable>
          ),
          headerRight:
            Platform.OS === 'ios'
              ? () => (
                  <Link href="/modal" asChild>
                    <Pressable className="opacity-80">
                      {({ pressed }) => (
                        <View
                          className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
                          <Icon
                            name="personCircle"
                            color={
                              colorScheme === 'dark'
                                ? COLORS.white
                                : COLORS.black
                            }
                            size={24}
                          />
                        </View>
                      )}
                    </Pressable>
                  </Link>
                )
              : undefined,
        }}
      />
    </Stack>
  );
}
