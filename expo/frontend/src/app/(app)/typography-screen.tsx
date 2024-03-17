import { Text } from '@/components/Text';
import { ScrollView, View } from 'react-native';

export default function TypographyScreen() {
  return (
    <ScrollView
      contentContainerClassName="py-16 justify-center items-center"
      contentInsetAdjustmentBehavior="automatic">
      <View className="justify-center items-center gap-8">
        <Text variant="largeTitle">Large Title</Text>
        <Text variant="title1">Title1</Text>
        <Text variant="title2">Title2</Text>
        <Text variant="title3">Title3</Text>
        <Text variant="heading">Heading</Text>
        <Text variant="body">Body</Text>
        <Text variant="callout">Callout</Text>
        <Text variant="subhead">Subhead</Text>
        <Text variant="footnote">Footnote</Text>
        <Text variant="caption1">Caption1</Text>
        <Text variant="caption2">Caption2</Text>
      </View>
    </ScrollView>
  );
}
