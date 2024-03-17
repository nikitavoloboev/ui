import { Text } from '@/components/Text';
import { Icon } from '@/icons';
import { cn } from '@/lib/utils';
import { COLORS } from '@/theme/colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link, useNavigation } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SearchBarProps } from 'react-native-screens';

const COMPONENTS = [
  {
    name: 'Buttons',
    path: '/buttons-screen',
    icon: 'playCircle',
    iconSize: 15,
  },
  {
    name: 'Typography',
    path: '/typography-screen',
    icon: 'textFormat',
    iconSize: 13,
  },
] as const;

export default function ComponentsScreen() {
  const paddingBottom = useBottomTabBarHeight();
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search...',
        barTintColor: colorScheme === 'dark' ? COLORS.black : COLORS.white,
        textColor: colorScheme === 'dark' ? COLORS.white : COLORS.black,
        headerIconColor: colorScheme === 'dark' ? COLORS.white : COLORS.black,
        hintTextColor: COLORS[colorScheme].grey,
        hideWhenScrolling: true,
        onChangeText(ev) {
          setSearch(ev.nativeEvent.text);
        },
      } satisfies SearchBarProps,
    });
  }, [navigation, colorScheme]);

  const data = search
    ? COMPONENTS.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    : COMPONENTS;

  return (
    <FlatList
      scrollToOverflowEnabled={true}
      contentInsetAdjustmentBehavior="automatic"
      data={data}
      contentContainerClassName="p-4"
      contentContainerStyle={{
        paddingBottom,
      }}
      extraData={search}
      keyExtractor={(item) => item.name}
      renderItem={({ index, item }) => {
        const isLast = index === data.length - 1;
        return (
          <Link href={item.path} asChild>
            <Pressable
              className={cn(
                index === 0 && 'rounded-t-xl border-t',
                isLast && 'rounded-b-xl border-b',
                'bg-card flex-row active:opacity-80  border-l border-r border-border'
              )}>
              <View className="w-12 items-center justify-center">
                <Icon
                  name={item.icon}
                  size={item.iconSize}
                  color={colorScheme === 'dark' ? COLORS.white : COLORS.black}
                />
              </View>
              <View
                className={cn(
                  !isLast && 'border-b border-border',
                  'flex-1 flex-row items-center justify-between py-3 pl-px pr-4'
                )}>
                <Text>{item.name}</Text>
                <Icon
                  name="chevronRight"
                  size={14}
                  color={COLORS[colorScheme].grey}
                />
              </View>
            </Pressable>
          </Link>
        );
      }}
    />
  );
}
