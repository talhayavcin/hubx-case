import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface PlanRowProps {
  label: string;
  price: string;
  active: boolean;
  onPress: () => void;
  badge?: string;
  isMonthly?: boolean;
}

const PlanRow = ({ label, price, active, onPress, badge,isMonthly = false }: PlanRowProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        active ? styles.containerActive : styles.containerInactive
      ]}
    >
      <BlurView 
        intensity={80}
        tint="dark"
        style={StyleSheet.absoluteFillObject}
      />

      {active && (
        <LinearGradient
          colors={['rgba(40, 175, 110, 0)', 'rgba(40, 175, 110, 0.24)']}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="none"
        />
      )}

      {badge && active && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      <View style={[styles.radio, active && styles.radioActive]}>
        {active && <View style={styles.radioInner} />}
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          {label}
        </Text>
        {isMonthly ? (
          <Text style={styles.price}>
            <Text style={styles.priceLight}>$2.99/month</Text>
            <Text style={styles.priceRegular}>, auto renewable</Text>
          </Text>
        ) : (
          <Text style={styles.price}>{price}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  containerInactive: {
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  containerActive: {
    borderWidth: 1.5,
    borderColor: '#28AF6E',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  radioActive: {
    backgroundColor: '#28AF6E',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Rubik-SemiBold',
    color: '#FFFFFF',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  price: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 0.1,
  },
  priceLight: {
    fontFamily: 'Rubik-Light',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  priceRegular: {
    fontFamily: 'Rubik-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#28AF6E',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
    lineHeight: 18,
  },
});

export default PlanRow;