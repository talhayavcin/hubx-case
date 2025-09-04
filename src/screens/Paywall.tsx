import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { storage } from '../services/storage';
import PlanRow from '../components/PlanRow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type PlanKey = 'monthly' | 'yearly';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PaywallScreen = ({ navigation, route }: Props) => {
  const fromOnboarding = route.params?.fromOnboarding ?? false;
  const [selected, setSelected] = useState<PlanKey>('yearly');

  const ctaText = useMemo(() => (selected === 'yearly' ? 'Try free for 3 days' : 'Subscribe'), [selected]);

  const footNote = useMemo(() => {
    if (selected === 'yearly') {
      return "After the 3-day free trial period you'll be charged $29.99 per year unless you cancel before the trial expires. Yearly subscription is auto-renewable.";
    }
    return 'Your subscription will auto-renew monthly for $2.99 unless canceled at least 24 hours before the end of the period.';
  }, [selected]);

  const handleClose = async () => {
    if (fromOnboarding) {
      await storage.setOnboardingCompleted(true);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' as never }],
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ImageBackground
        source={require('../../assets/paywall/header.png')}
        style={styles.headerBg}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={styles.closeBtn}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <Ionicons name="close-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text style={styles.titleBold}>PlantApp</Text>
              {' '}Premium
            </Text>
            <Text style={styles.subtitle}>Access All Features</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuresContainer}
            snapToInterval={SCREEN_WIDTH * 0.45 + 8}
            decelerationRate="fast"
          >
            {FEATURES.map((feature, index) => (
              <View 
                key={index} 
                style={[styles.featureCard, index === FEATURES.length - 1 && styles.lastFeatureCard]}
              >
                <View style={styles.featureIconContainer}>
                  <Image source={feature.icon} style={styles.featureIcon} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ImageBackground>

      <View style={styles.bottomSection}>
        <View style={styles.plansContainer}>
          <PlanRow
            label="1 Month"
            price="$2.99/month, auto renewable"
            active={selected === 'monthly'}
            onPress={() => setSelected('monthly')}
            isMonthly={true}
          />
          <View style={{ marginTop: 8 }}>
            <PlanRow
              label="1 Year"
              price="First 3 days free, then $529.99/year"
              active={selected === 'yearly'}
              onPress={() => setSelected('yearly')}
              badge="Save 50%"
              isMonthly={false}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
          <Text style={styles.ctaText}>{ctaText}</Text>
        </TouchableOpacity>

        <Text style={styles.legalText}>{footNote}</Text>

        <View style={styles.footerLinks}>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.footerLink}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.footerLink}>Privacy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>•</Text>
          <TouchableOpacity activeOpacity={0.6}>
            <Text style={styles.footerLink}>Restore</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FEATURES = [
  { 
    title: 'Unlimited', 
    desc: 'Plant Identify', 
    icon: require('../../assets/paywall/scanner.png') 
  },
  { 
    title: 'Faster', 
    desc: 'Process', 
    icon: require('../../assets/paywall/speedometer.png') 
  },
  { 
    title: 'Detailed', 
    desc: 'Care Guides', 
    icon: require('../../assets/paywall/scanner.png') 
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101E17',
  },
  headerBg: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.6,
    justifyContent: 'flex-end',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 24,
    padding: 4,
  },
  headerContent: {
    justifyContent: 'flex-end',
  },
  titleContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    fontFamily: 'Rubik-Light',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  titleBold: {
    fontFamily: 'Visby-ExtraBold',
    fontSize: 30,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Rubik-Light',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    letterSpacing: 0.38,
  },
  featuresContainer: {
    paddingHorizontal: 24,
    paddingBottom: 5,
    gap: 8
  },
  featureCard: {
    width: SCREEN_WIDTH * 0.42,
    maxWidth: 180,
    height: 130,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 16,
  },
  lastFeatureCard: {
    marginRight: 24,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#0000003D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFFFFF',
  },
  featureTitle: {
    fontSize: 20,
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 24,
    letterSpacing: 0.38,
  },
  featureDesc: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: -0.08,
    lineHeight: 18,
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  plansContainer: {
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#28AF6E',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
    letterSpacing: -0.24,
    lineHeight: 24,
  },
  legalText: {
    fontSize: 9,
    fontFamily: 'Rubik-Light',
    color: 'rgba(255,255,255,0.52)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 11,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  footerLink: {
    fontSize: 11,
    fontFamily: 'Rubik-Regular',
    color: 'rgba(255,255,255,0.5)',
  },
  footerDot: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
});

export default PaywallScreen;