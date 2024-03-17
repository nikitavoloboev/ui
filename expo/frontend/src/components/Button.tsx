import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

import { TextClassContext } from '@/components/Text';
import { cn } from '@/lib/utils';

const buttonVariants = cva('flex-row items-center justify-center gap-1.5', {
  variants: {
    variant: {
      filled: 'bg-primary',
      tinted: 'bg-primary/15',
      grey: 'bg-border/80',
      plain: '',
    },
    size: {
      sm: 'py-1 px-2.5 rounded-full',
      md: 'py-1.5 px-3.5 rounded-full',
      lg: 'py-3.5 px-5 rounded-xl gap-2',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

const buttonPressedVariants = cva('', {
  variants: {
    variant: {
      filled: 'opacity-80',
      tinted: 'opacity-80',
      grey: 'bg-border/50',
      plain: 'bg-foreground/5',
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
});

const buttonTextVariants = cva('font-semibold ', {
  variants: {
    variant: {
      filled: 'text-white',
      plain: 'text-primary',
      grey: 'text-primary',
      tinted: 'text-primary',
    },
    size: {
      sm: 'text-[15px] leading-5',
      md: 'text-[17px] leading-6',
      lg: 'text-[17px] leading-6',
    },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const Style: ViewStyle = {
  borderCurve: 'continuous',
};

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      style: styleProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      ...props
    },
    ref
  ) => {
    // Given bug in NativeWind <= v4.0.23: https://github.com/marklawlor/nativewind/issues/740
    // `isPressed` is a workaround for `active:*` preventing `onPress` to be updated: https://github.com/mrzachnugent/react-native-reusables/issues/25
    const [isPressed, setIsPressed] = React.useState(false);
    function onPressIn(ev: GestureResponderEvent) {
      onPressInProp?.(ev);
      setIsPressed(true);
    }
    function onPressOut(ev: GestureResponderEvent) {
      onPressOutProp?.(ev);
      setIsPressed(false);
    }

    const style = React.useMemo(() => {
      if (styleProp) {
        return StyleSheet.flatten([Style, styleProp]);
      }
      return Style;
    }, [styleProp]);
    return (
      <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
        <Pressable
          className={cn(
            props.disabled && 'opacity-50',
            buttonVariants({ variant, size, className }),
            isPressed && buttonPressedVariants({ variant })
          )}
          ref={ref}
          style={style}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
