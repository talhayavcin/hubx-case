import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuestionCardProps {
  item: {
    id: number;
    title: string;
    image_uri: string;
  };
  onPress?: () => void;
}

const QuestionCard = ({ item, onPress }: QuestionCardProps) => (
  <TouchableOpacity 
    style={styles.questionCard} 
    activeOpacity={0.8}
    onPress={onPress}
  >
    <ImageBackground 
      source={{ uri: item.image_uri }} 
      style={styles.questionImage}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.questionGradient}>
        <View style={styles.questionContent}>
          <Text style={styles.questionTitle}>{item.title}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  questionCard: {
    width: 240,
    height: 164,
    marginRight: 10,
  },
  questionImage: {
    width: '100%',
    height: '100%',
  },
  questionGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 12,
  },
  questionContent: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Rubik-Medium',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default QuestionCard;