declare module 'react-native-animatable' {
    import { ComponentType } from 'react';
    import {
      ViewStyle,
      TextStyle,
      ImageStyle,
      StyleProp,
      Animated,
      TextProps,
      ViewProps,
      ImageProps,
    } from 'react-native';
  
    export type AnimatableProperties<T> = {
      animation?: string | AnimationObject | undefined;
      duration?: number | undefined;
      delay?: number | undefined;
      direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | undefined;
      easing?: string | ((t: number) => number) | undefined;
      iterationCount?: number | 'infinite' | undefined;
      iterationDelay?: number | undefined;
      onAnimationBegin?: () => void | undefined;
      onAnimationEnd?: () => void | undefined;
      style?: StyleProp<T>;
    };
  
    export interface AnimationObject {
      from: ViewStyle | TextStyle | ImageStyle;
      to: ViewStyle | TextStyle | ImageStyle;
    }
  
    export const View: ComponentType<AnimatableProperties<ViewStyle> & ViewProps>;
    export const Text: ComponentType<AnimatableProperties<TextStyle> & TextProps>;
    export const Image: ComponentType<AnimatableProperties<ImageStyle> & ImageProps>;
  
    export function createAnimatableComponent<P>(
      component: ComponentType<P>
    ): ComponentType<P & AnimatableProperties<ViewStyle>>;
  }
  