import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingPage1Props {
  onContinue: () => void;
}

const OnboardingPage1 = ({ onContinue }: OnboardingPage1Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image 
          source={require('../../assets/onboarding/onboarding1-bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Welcome to <Text style={styles.titleBold}>PlantApp</Text>
          </Text>
          <Text style={styles.subtitle}>
            Identify more than 3000+ plants and{'\n'}88% accuracy.
          </Text>
        </View>

        <View style={styles.mainImageContainer}>
          <Image 
            source={require('../../assets/onboarding/onboarding1.png')}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By tapping next, you are agreeing to PlantID{'\n'}
          <Text style={styles.termsLink}>Terms of Use</Text> &{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 60,
    zIndex: 2,
  },
  titleContainer: {
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: 28,
    lineHeight: 36,
    color: '#13231B',
    letterSpacing: 0.07,
  },
  titleBold: {
    fontFamily: 'Rubik-SemiBold',
    color: '#13231B',
  },
  subtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    lineHeight: 22,
    color: '#13231BB2',
    marginTop: 8,
  },
  mainImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_HEIGHT * 0.65,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 50,
    zIndex: 2,
  },
  button: {
    backgroundColor: '#28AF6E',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.24,
  },
  termsText: {
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 15,
    color: '#597165B2',
    marginTop: 16,
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});

export default OnboardingPage1;