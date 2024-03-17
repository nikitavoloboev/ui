import React from 'react';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import { Icon } from '@/icons';
import { COLORS } from '@/theme/colors';

export default function ButtonsScreen() {
  const { colorScheme } = useColorScheme();
  return (
    <ScrollView
      contentContainerClassName="py-16 justify-center items-center"
      contentInsetAdjustmentBehavior="automatic">
      <View className="justify-center items-center gap-8">
        <View className="flex-row gap-8">
          <View className="gap-8 items-center">
            <Text variant="heading">Plain</Text>
            <Button variant={'plain'} size="sm">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={12}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'plain'} size="md">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'plain'} size="lg">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
          </View>
          <View className="gap-8 items-center">
            <Text variant="heading">Grey</Text>
            <Button variant={'grey'} size="sm">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={12}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'grey'} size="md">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'grey'} size="lg">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
          </View>
        </View>
        <View className="p-4" />
        <View className="flex-row gap-8">
          <View className="gap-8 items-center">
            <Text variant="heading">Tinted</Text>
            <Button variant={'tinted'} size="sm">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={12}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'tinted'} size="md">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
            <Button variant={'tinted'} size="lg">
              <Icon
                name="playFill"
                color={COLORS[colorScheme].blue}
                size={15}
              />
              <Text>Play</Text>
            </Button>
          </View>
          <View className="gap-8 items-center">
            <Text variant="heading">Filled</Text>
            <Button variant={'filled'} size="sm">
              <Icon name="playFill" color="white" size={12} />
              <Text>Play</Text>
            </Button>
            <Button variant={'filled'} size="md">
              <Icon name="playFill" color="white" size={15} />
              <Text>Play</Text>
            </Button>
            <Button variant={'filled'} size="lg">
              <Icon name="playFill" color="white" size={15} />
              <Text>Play</Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
