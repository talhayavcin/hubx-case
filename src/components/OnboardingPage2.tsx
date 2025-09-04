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

interface OnboardingPage2Props {
  onContinue: () => void;
  currentPage: number;
  totalPages: number;
}

const OnboardingPage2 = ({ onContinue, currentPage, totalPages}: OnboardingPage2Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../../assets/onboarding/onboarding2-bg.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleNormal}>Take a photo to </Text>
            <View style={styles.boldWrapper}>
              <Text style={styles.titleBold}>identify</Text>
              <Image
                source={require('../../assets/onboarding/title-highlight.png')}
                style={styles.highlightImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.titleNormal}>the plant!</Text>
        </View>

        <View style={styles.mainImageContainer}>
          <Image
            source={require('../../assets/onboarding/onboarding2.png')}
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
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.paginationDot,
                idx === currentPage && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  titleNormal: {
    fontFamily: 'Rubik-Medium',
    fontSize: 28,
    lineHeight: 36,
    color: '#13231B',
    letterSpacing: 0.07,
  },
  boldWrapper: {
    position: 'relative',
    alignSelf: 'flex-end',
  },
  titleBold: {
    fontFamily: 'Rubik-ExtraBold',
    fontSize: 28,
    lineHeight: 36,
    color: '#13231B',
    letterSpacing: 0.07,
  },
  highlightImage: {
    position: 'absolute',
    left: -20,
    right: 0,
    bottom: -15,
    height: 14,
    zIndex: -1,
  },
  mainImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_HEIGHT * 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32.5,
    marginBottom: 20,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#13231B',
    opacity: 0.3,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 1,
    backgroundColor: '#13231B',
  },
});

export default OnboardingPage2;
