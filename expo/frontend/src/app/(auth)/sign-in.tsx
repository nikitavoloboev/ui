import { Canvas, ImageSVG, Skia } from '@shopify/react-native-skia';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/icons';

import { useEmailAuth } from '@/lib/auth/email';

import { useKeyboard } from '@/lib/keyboard';
import { cn } from '@/lib/utils';
import { COLORS } from '@/theme/colors';

export default function SignIn() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const { isKeyboardVisible } = useKeyboard();
  const emailRef = React.useRef<TextInput>(null);
  const [email, setEmail] = React.useState('');
  const passwordRef = React.useRef<TextInput>(null);
  const [password, setPassword] = React.useState('');
  const [errors, setError] = React.useState<string[]>([]);
  const { signInWithEmail } = useEmailAuth();

  const svg = Skia.SVG.MakeFromString(
    `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="55" height="49" viewBox="0 0 128 112">
    <path d="M0 0 C1.78649712 0.5510289 1.78649712 0.5510289 3.60908508 1.1131897 C6.79879979 2.1006664 9.98315395 3.10268344 13.1658287 4.11244965 C16.46934885 5.15696407 19.77855566 6.18314928 23.0871582 7.21142578 C28.36012431 8.85272879 33.62941046 10.50533515 38.89599609 12.16699219 C44.4323809 13.91276121 49.97401825 15.640204 55.52124023 17.35119629 C59.03418677 18.43474199 62.54515254 19.52458271 66.05548096 20.61657715 C67.63064338 21.10616281 69.20627671 21.59423633 70.78240967 22.08068848 C85.92587381 26.76727758 85.92587381 26.76727758 92.2578125 30.484375 C93.40774616 32.78424231 93.4895054 34.29906588 93.5703125 36.859375 C93.62638672 38.01566406 93.62638672 38.01566406 93.68359375 39.1953125 C93.0867031 42.40428427 91.73144023 43.37851729 89.2578125 45.484375 C76.026532 51.83249756 61.10203689 55.40680164 47.1199646 59.70516586 C45.17854566 60.30202975 43.23743399 60.89988394 41.29638672 61.49795532 C34.90517463 63.46652431 28.51198721 65.42849391 22.11669922 67.38378906 C17.15047977 68.90244223 12.18888679 70.43509451 7.23036194 71.97865295 C4.37035516 72.86502953 1.50595453 73.73618543 -1.36080933 74.60043335 C-3.17259439 75.15073709 -4.97913322 75.7182236 -6.78540039 76.28637695 C-15.17811511 78.77388065 -22.13931941 79.1619875 -30.3046875 75.734375 C-33.11351238 74.19715092 -33.60599851 73.85889473 -34.7421875 70.734375 C-34.7421875 69.991875 -34.7421875 69.249375 -34.7421875 68.484375 C-30.43896658 65.62679662 -26.00735639 64.01103 -21.16015625 62.34765625 C-19.93888786 61.92120064 -19.93888786 61.92120064 -18.69294739 61.48612976 C-16.10698163 60.58447384 -13.518412 59.69057554 -10.9296875 58.796875 C-9.16974401 58.18475594 -7.40997632 57.57213118 -5.65039062 56.95898438 C-1.34966974 55.46158487 2.95340227 53.9711342 7.2578125 52.484375 C-1.1241793 48.86340783 -9.59258281 45.71487382 -18.2421875 42.796875 C-20.5243012 42.02468328 -22.80558976 41.25004752 -25.0859375 40.47265625 C-26.07787109 40.13790283 -27.06980469 39.80314941 -28.09179688 39.45825195 C-30.41525966 38.60450352 -32.55950713 37.64529945 -34.7421875 36.484375 C-34.7421875 34.834375 -34.7421875 33.184375 -34.7421875 31.484375 C-28.75875919 32.07796507 -23.58707992 33.80757026 -17.96875 35.8984375 C-16.07316998 36.58403411 -14.17732836 37.26890779 -12.28125 37.953125 C-9.320496 39.02940572 -6.36215724 40.11123935 -3.40820312 41.20605469 C-0.53838206 42.26622509 2.33918998 43.30256357 5.21875 44.3359375 C6.09091156 44.66606842 6.96307312 44.99619934 7.86166382 45.33633423 C13.71496999 47.41289159 18.17652983 47.70505097 24.2578125 46.484375 C25.2684375 46.29875 26.2790625 46.113125 27.3203125 45.921875 C27.9596875 45.7775 28.5990625 45.633125 29.2578125 45.484375 C29.2578125 44.824375 29.2578125 44.164375 29.2578125 43.484375 C27.97624268 43.22245361 26.69467285 42.96053223 25.37426758 42.69067383 C20.24095944 41.54706581 15.34956967 39.93134954 10.39453125 38.18359375 C9.48129593 37.86534134 8.56806061 37.54708893 7.62715149 37.2191925 C5.70606266 36.54839776 3.78584049 35.87511628 1.86645508 35.19946289 C-1.03404287 34.17913729 -3.93764516 33.16807545 -6.84179688 32.15820312 C-16.26382641 28.86690677 -25.60890645 25.52246085 -34.7421875 21.484375 C-34.7421875 19.834375 -34.7421875 18.184375 -34.7421875 16.484375 C-28.50631641 17.08779449 -23.028478 18.96302132 -17.15625 21.08984375 C-16.14106293 21.45153152 -15.12587585 21.8132193 -14.07992554 22.18586731 C-10.84009616 23.34168549 -7.60361144 24.50655959 -4.3671875 25.671875 C-2.23068813 26.43616042 -0.0939712 27.19983793 2.04296875 27.96289062 C3.6106601 28.52328537 3.6106601 28.52328537 5.21002197 29.09500122 C7.28934345 29.83804995 9.36889064 30.58046737 11.44866943 31.32223511 C16.11414762 32.98886555 20.7721483 34.6695532 25.41113281 36.40869141 C26.19090485 36.69649979 26.97067688 36.98430817 27.77407837 37.28083801 C29.1956751 37.80619109 30.61383124 38.34100205 32.0274353 38.88749695 C35.85528635 40.28940156 38.3472194 40.68918842 42.2578125 39.484375 C43.1859375 39.29875 44.1140625 39.113125 45.0703125 38.921875 C45.7921875 38.7775 46.5140625 38.633125 47.2578125 38.484375 C45.08851525 36.06555764 43.26292751 34.87736325 40.2265625 33.75 C39.37416992 33.43063477 38.52177734 33.11126953 37.64355469 32.78222656 C36.69125977 32.43643555 35.73896484 32.09064453 34.7578125 31.734375 C33.7462207 31.36022461 32.73462891 30.98607422 31.69238281 30.60058594 C24.32912469 27.90277646 16.92933825 25.312251 9.5234375 22.734375 C8.58024658 22.40604675 7.63705566 22.07771851 6.6652832 21.73944092 C1.909098 20.08565428 -2.84931447 18.43868696 -7.61132812 16.80175781 C-16.78690063 13.63747734 -25.86040205 10.41505697 -34.7421875 6.484375 C-34.84375 4.08984375 -34.84375 4.08984375 -34.7421875 1.484375 C-25.85902813 -7.74044435 -10.51203755 -3.3739748 0 0 Z " fill="${
      colorScheme === 'dark' ? 'white' : 'black'
    }" transform="translate(34.7421875,3.515625)"/>
    <path d="M0 0 C0.33 0 0.66 0 1 0 C1.49008177 6.37106297 1.49008177 6.37106297 -0.60961914 9.06567383 C-11.83414948 18.14870456 -31.60003864 21.05900184 -45.1378479 25.22079086 C-47.07926684 25.81765475 -49.02037851 26.41550894 -50.96142578 27.01358032 C-57.35263787 28.98214931 -63.74582529 30.94411891 -70.14111328 32.89941406 C-75.10733273 34.41806723 -80.06892571 35.95071951 -85.02745056 37.49427795 C-87.88745734 38.38065453 -90.75185797 39.25181043 -93.61862183 40.11605835 C-95.43040689 40.66636209 -97.23694572 41.2338486 -99.04321289 41.80200195 C-107.43592761 44.28950565 -114.39713191 44.6776125 -122.5625 41.25 C-125.37132488 39.71277592 -125.86381101 39.37451973 -127 36.25 C-127 35.5075 -127 34.765 -127 34 C-126.01 33.505 -126.01 33.505 -125 33 C-122.38067051 33.94586898 -119.85939512 35.06212774 -117.3125 36.1875 C-108.31754366 38.39381004 -99.13238547 34.78799537 -90.5859375 32.09765625 C-89.29633544 31.69920988 -88.00647297 31.30160548 -86.71636963 30.90478516 C-83.30105695 29.85169646 -79.88945128 28.78707158 -76.47858429 27.7196846 C-72.96077842 26.62068046 -69.43994884 25.53144909 -65.91943359 24.44116211 C-60.41266347 22.73450739 -54.90785136 21.02168103 -49.40429688 19.3046875 C-43.30178066 17.40135565 -37.19234401 15.52161476 -31.078125 13.65625 C-28.9077336 12.9909396 -26.73760935 12.32477016 -24.56768799 11.65792847 C-22.6912676 11.08281083 -20.81319047 10.51310718 -18.93505859 9.94360352 C-8.12941859 6.99754293 -8.12941859 6.99754293 0 0 Z " fill="${
      colorScheme === 'dark' ? 'white' : 'black'
    }" transform="translate(127,68)"/>
    <path d="M0 0 C0.33 0 0.66 0 1 0 C1.49008177 6.37106297 1.49008177 6.37106297 -0.60961914 9.06567383 C-11.83414948 18.14870456 -31.60003864 21.05900184 -45.1378479 25.22079086 C-47.07926684 25.81765475 -49.02037851 26.41550894 -50.96142578 27.01358032 C-57.35263787 28.98214931 -63.74582529 30.94411891 -70.14111328 32.89941406 C-75.10733273 34.41806723 -80.06892571 35.95071951 -85.02745056 37.49427795 C-87.88745734 38.38065453 -90.75185797 39.25181043 -93.61862183 40.11605835 C-95.43040689 40.66636209 -97.23694572 41.2338486 -99.04321289 41.80200195 C-107.43592761 44.28950565 -114.39713191 44.6776125 -122.5625 41.25 C-125.37132488 39.71277592 -125.86381101 39.37451973 -127 36.25 C-127 35.5075 -127 34.765 -127 34 C-126.01 33.505 -126.01 33.505 -125 33 C-122.38067051 33.94586898 -119.85939512 35.06212774 -117.3125 36.1875 C-108.31754366 38.39381004 -99.13238547 34.78799537 -90.5859375 32.09765625 C-89.29633544 31.69920988 -88.00647297 31.30160548 -86.71636963 30.90478516 C-83.30105695 29.85169646 -79.88945128 28.78707158 -76.47858429 27.7196846 C-72.96077842 26.62068046 -69.43994884 25.53144909 -65.91943359 24.44116211 C-60.41266347 22.73450739 -54.90785136 21.02168103 -49.40429688 19.3046875 C-43.30178066 17.40135565 -37.19234401 15.52161476 -31.078125 13.65625 C-28.9077336 12.9909396 -26.73760935 12.32477016 -24.56768799 11.65792847 C-22.6912676 11.08281083 -20.81319047 10.51310718 -18.93505859 9.94360352 C-8.12941859 6.99754293 -8.12941859 6.99754293 0 0 Z " fill="${
      colorScheme === 'dark' ? 'white' : 'black'
    }" transform="translate(127,53)"/>
    </svg>`
  )!;

  const googleSvg = Skia.SVG.MakeFromString(
    `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>`
  )!;

  async function handleSubmit() {
    const potentialErrors = [];
    if (!email) {
      emailRef.current?.focus();
      potentialErrors.push('email');
    }
    if (!password) {
      if (email) {
        passwordRef.current?.focus();
      }
      potentialErrors.push('password');
    }
    if (potentialErrors.length > 0) {
      setError(potentialErrors);
      return;
    }
    await signInWithEmail(email, password);
    router.replace('/');
  }

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ScrollView
          style={{
            paddingTop: insets.top,
            paddingBottom: isKeyboardVisible ? 12 : insets.bottom,
          }}
          className="bg-background"
          contentContainerClassName="flex-1 justify-between px-4 py-2"
          keyboardShouldPersistTaps="handled">
          <View
            className={cn(
              'pt-16 items-center',
              isKeyboardVisible && 'android:pt-4'
            )}>
            <Canvas style={{ width: 55, height: 49 }}>
              <ImageSVG svg={svg} x={0} y={0} width={74} height={65} />
            </Canvas>
            <Text variant="title2" className="mt-6 mb-8 font-bold">
              ShipRN
            </Text>
            <View className="bg-card border border-border rounded-xl w-full py-3 pl-4">
              <View className="flex-row items-center pr-4 border-b border-border pb-3">
                <View className="w-24">
                  <Text
                    onPress={() => {
                      emailRef.current?.focus();
                    }}
                    suppressHighlighting
                    className={cn(
                      errors.includes('email') && 'text-destructive'
                    )}>
                    Email
                  </Text>
                </View>
                <TextInput
                  ref={emailRef}
                  placeholder="john@doe.com"
                  className="flex-1 px-3 text-lg leading-[1.25] text-foreground"
                  placeholderTextColor={COLORS[colorScheme].grey}
                  clearButtonMode="while-editing"
                  value={email}
                  onChangeText={(text) => {
                    if (errors.includes('email')) {
                      setError((prev) => prev.filter((e) => e !== 'email'));
                    }
                    setEmail(text);
                  }}
                  onSubmitEditing={() => {
                    passwordRef.current?.focus();
                  }}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="email"
                />
                {errors.includes('email') && (
                  <View className="pr-1.5">
                    <Icon
                      color={COLORS[colorScheme].red}
                      size={18}
                      name="multipleCircle"
                    />
                  </View>
                )}
              </View>
              <View className="flex-row items-center pr-4 pt-3">
                <View className="w-24">
                  <Text
                    className={cn(
                      errors.includes('password') && 'text-destructive'
                    )}
                    onPress={() => {
                      passwordRef.current?.focus();
                    }}
                    suppressHighlighting>
                    Password
                  </Text>
                </View>
                <TextInput
                  ref={passwordRef}
                  placeholder="********"
                  className="flex-1 px-3 text-lg leading-[1.25] text-foreground"
                  clearButtonMode="while-editing"
                  placeholderTextColor={COLORS[colorScheme].grey}
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    if (errors.includes('password')) {
                      setError((prev) => prev.filter((e) => e !== 'password'));
                    }
                    setPassword(text);
                  }}
                  onSubmitEditing={handleSubmit}
                  returnKeyType="go"
                  autoCorrect={false}
                />
                {errors.includes('password') && (
                  <View className="pr-1.5">
                    <Icon
                      color={COLORS[colorScheme].red}
                      size={18}
                      name="multipleCircle"
                    />
                  </View>
                )}
              </View>
            </View>
            <View>
              {errors.length > 0 && (
                <View className="gap-2 items-center justify-center p-4">
                  {errors.includes('email') && (
                    <Animated.View>
                      <Text
                        variant="footnote"
                        className="text-destructive font-medium">
                        You must enter an email address
                      </Text>
                    </Animated.View>
                  )}
                  {errors.includes('password') && (
                    <Animated.View>
                      <Text
                        variant="footnote"
                        className="text-destructive font-medium">
                        You must enter a password
                      </Text>
                    </Animated.View>
                  )}
                </View>
              )}
            </View>
            <View className="flex-row items-center justify-center p-4">
              <Text variant="footnote" className="opacity-70">
                Don't have an account?{' '}
              </Text>
              <Button variant="plain" size="sm" className="px-0">
                <Text className="text-[13px] leading-5">Sign Up</Text>
              </Button>
            </View>
          </View>
          <View>
            {!isKeyboardVisible ? (
              <Animated.View
                entering={FadeInDown}
                exiting={SlideOutDown}
                className="gap-4"></Animated.View>
            ) : (
              <Button size="lg" className="w-full" onPress={handleSubmit}>
                <Text>Sign in</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
