import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Appearance, Pressable, View } from 'react-native';
import Animated, {
  LayoutAnimationConfig,
  ZoomInRotate,
} from 'react-native-reanimated';

import { Text } from '@/components/Text';
import { Icon, IconName } from '@/icons';
import { cn } from '@/lib/utils';
import { COLORS } from '@/theme/colors';

import { Button } from './Button';

export function DrawerContent(props: DrawerContentComponentProps) {
  const { colorScheme } = useColorScheme();
  const activeScreen = props.state.routes[props.state.index].name;

  function closeDrawer() {
    props.navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <View className="flex-1 bg-background p-2">
      <DrawerContentScrollView {...props}>
        <View className="flex-row justify-between items-center px-1">
          <Pressable onPress={closeDrawer}>
            <Icon
              name="rectangleLefthalfInsetFilledArrowLeft"
              size={20}
              color={COLORS[colorScheme].blue}
            />
          </Pressable>
          <ThemeToggle />
        </View>
        <Text
          variant="largeTitle"
          className="text-card-foreground font-bold pt-8 pb-4 pl-0.5">
          Title
        </Text>
        <View className="gap-1.5">
          <DrawerItem
            icon="command"
            isActive={activeScreen === '(tabs)'}
            label="Home"
            onPress={() => {}}
          />
          <DrawerItem
            icon="personCircle"
            isActive={false}
            label="My Profile"
            onPress={() => {
              router.push('/modal');
            }}
          />
          <DrawerItem
            icon="command"
            isActive={false}
            label="Example"
            onPress={() => {}}
          />
        </View>
        <Text
          variant="title3"
          className="text-card-foreground font-bold pt-6 pb-2 pl-0.5">
          Section
        </Text>
        <View className="gap-1">
          <DrawerItem
            icon="multipleCircle"
            isActive={false}
            label="Section Example"
            onPress={() => {}}
          />
          <DrawerItem
            icon="personCircle"
            isActive={false}
            label="Section Example 2"
            onPress={() => {}}
          />
          <DrawerItem
            icon="playCircle"
            isActive={false}
            label="Section Example 3"
            onPress={() => {}}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

function DrawerItem({
  label,
  icon,
  onPress,
  isActive,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
  isActive: boolean;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <Button
      variant={isActive ? 'filled' : 'plain'}
      onPress={onPress}
      className={'justify-start rounded-lg py-2 px-2.5 gap-3'}>
      <Icon
        name={icon}
        size={18}
        color={isActive || colorScheme === 'dark' ? COLORS.white : COLORS.black}
      />
      <Text
        className={cn(
          isActive ? 'text-white' : 'text-card-foreground',
          'font-normal'
        )}>
        {label}
      </Text>
    </Button>
  );
}

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <LayoutAnimationConfig skipEntering>
      <Animated.View
        className="h-6 w-6 items-center justify-center"
        key={`toggle-${colorScheme}`}
        entering={ZoomInRotate}>
        <Pressable
          onPress={() => {
            // ColorScheme is set with `Appearance` as well for the iOS header search placeholder text: https://github.com/software-mansion/react-native-screens/discussions/1758
            Appearance.setColorScheme(
              colorScheme === 'dark' ? 'light' : 'dark'
            );
            toggleColorScheme();
          }}
          className="opacity-80">
          {colorScheme === 'dark'
            ? ({ pressed }) => (
                <View className={cn('px-0.5', pressed && 'opacity-50')}>
                  <Icon
                    name="moon"
                    color={COLORS[colorScheme].blue}
                    size={21}
                  />
                </View>
              )
            : ({ pressed }) => (
                <View className={cn('px-0.5', pressed && 'opacity-50')}>
                  <Icon
                    name="sunMin"
                    color={COLORS[colorScheme].blue}
                    size={23}
                  />
                </View>
              )}
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  );
}
