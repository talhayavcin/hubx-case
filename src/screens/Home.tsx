import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useCategories, useQuestions } from '../api/client';
import { Ionicons } from '@expo/vector-icons';
import QuestionCard from '../components/QuestionCard';
import CategoryCard from '../components/CategoryCard';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: questionsData, isLoading: questionsLoading } = useQuestions();
  const navigation = useNavigation();
  
  const categories = categoriesData?.data || [];
  const questions = questionsData || [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const handleNavigatePaywall = () => {
    navigation.navigate('Paywall' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F6F6" />
      
      <ImageBackground
        source={require('../../assets/home/header-bg.png')}
        style={styles.headerContainer}
        resizeMode="cover"
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Hi, plant lover!</Text>
          <Text style={styles.greetingTime}>{getGreeting()} ⛅</Text>

          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#ABABAB" style={styles.searchIcon} />
            <TextInput
              placeholder="Search for plants"
              placeholderTextColor="#AFAFAF"
              style={styles.searchInput}
            />
          </View>
        </View>
      </ImageBackground>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity onPress={handleNavigatePaywall} style={styles.premiumBanner} activeOpacity={0.8}>
          <View style={styles.premiumLeft}>
            <View style={styles.mailIconContainer}>
              <Ionicons name="mail" size={32} color="#F0D399" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </View>
            <View style={styles.premiumTextContainer}>
              <MaskedView
                maskElement={
                  <Text style={styles.premiumTitle}>
                    <Text style={{ fontWeight: '700' }}>FREE</Text>
                    <Text style={{ fontWeight: '600' }}> Premium Available</Text>
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#E5C990', '#E4B046']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.premiumTitleGradient}
                />
              </MaskedView>
              
              <MaskedView
                maskElement={
                  <Text style={styles.premiumSubtitle}>Tap to upgrade your account!</Text>
                }
              >
                <LinearGradient
                  colors={['#E5C990', '#E4B046']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.premiumSubtitleGradient}
                />
              </MaskedView>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#D0B070" />
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Started</Text>
          {questionsLoading ? (
            <ActivityIndicator size="small" color="#28AF6E" style={styles.loader} />
          ) : (
            <FlatList
              data={questions}
              renderItem={({ item }) => <QuestionCard item={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.questionsContainer}
            />
          )}
        </View>

        <View style={styles.categoriesSection}>
          {categoriesLoading ? (
            <ActivityIndicator size="large" color="#28AF6E" style={styles.loader} />
          ) : (
            <FlatList
              data={categories.sort((a: any, b: any) => a.rank - b.rank)}
              renderItem={({ item, index }) => <CategoryCard item={item} index={index} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.categoriesGrid}
              columnWrapperStyle={styles.categoryRow}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAFA',
  },
  headerContainer: {
    height: 200,
    backgroundColor: '#F6F6F6',
    borderBottomWidth: 0.2,
    borderBottomColor: 'rgba(60, 60, 67, 0.25)',
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 14,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#13231B',
    fontFamily: 'Rubik-Regular',
    marginBottom: 6,
    letterSpacing: 0.07,
  },
  greetingTime: {
    fontSize: 24,
    color: '#13231B',
    fontFamily: 'Rubik-Medium',
    marginBottom: 14,
    letterSpacing: 0.35,
    lineHeight: 28,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    height: 44,
    borderWidth: 0.2,
    borderColor: 'rgba(60, 60, 67, 0.25)',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15.5,
    color: '#13231B',
    fontFamily: 'Rubik-Regular',
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#24201A',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 8,
    paddingVertical: 13,
    paddingLeft: 20,
    paddingRight: 12,
    borderRadius: 12,
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mailIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#E82C13E5',
    borderRadius: 15,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Rubik-Medium',
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  premiumTitleGradient: {
    width: '100%',
    height: 20,
  },
  premiumSubtitle: {
    fontSize: 13,
    lineHeight: 16,
  },
  premiumSubtitleGradient: {
    width: '100%',
    height: 18,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Rubik-Medium',
    color: '#13231B',
    marginBottom: 16,
    paddingHorizontal: 24,
    lineHeight: 20,
    letterSpacing: -0.24
  },
  questionsContainer: {
    paddingHorizontal: 24,
  },
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  categoriesGrid: {
    paddingTop: 8,
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  loader: {
    marginTop: 20,
  },
});

export default HomeScreen;