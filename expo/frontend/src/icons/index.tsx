import { Canvas, Group, Path, fitbox, rect } from '@shopify/react-native-skia';
import React from 'react';

import { PATHS } from './paths';

type Props = Omit<React.ComponentPropsWithoutRef<typeof Path>, 'path'> & {
  name: keyof typeof PATHS;
  /**
   * Icon Height
   */
  size?: number;
  color?: string;
};

export type IconName = keyof typeof PATHS;

export function Icon({ name, size, color = 'black', ...props }: Props) {
  const icon = PATHS[name];
  const { style, transform } = React.useMemo(() => {
    const style = {
      height: size ?? icon.height,
      width: icon.width * ((size ?? icon.width) / icon.height),
    };
    if (size === icon.height) {
      return { style };
    }
    const src = rect(0, 0, icon.width, icon.height);
    if (size && size < 0) {
      return { style, transform: fitbox('contain', src, rect(0, 0, 0, 0)) };
    }
    return {
      style,
      transform: fitbox('contain', src, rect(0, 0, style.width, style.height)),
    };
  }, [size]);
  return (
    <Canvas style={style}>
      <Group transform={transform} color={color}>
        <Path path={icon.path} {...props} />
      </Group>
    </Canvas>
  );
}
