import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  View,
} from 'react-native';

interface CategoryCardProps {
  item: {
    id: number;
    title: string;
    rank: number;
    image?: { url: string };
  };
  index: number;
  onPress?: () => void;
}

const CategoryCard = ({ item, index, onPress }: CategoryCardProps) => {
  const isFirstRow = index < 2;
  const isLeftColumn = index % 2 === 0;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.categoryCard,
        !isLeftColumn && styles.categoryCardRight,
        !isFirstRow && styles.categoryCardBottom,
      ]}
    >
      <ImageBackground
        source={item.image?.url ? { uri: item.image.url } : undefined}
        style={styles.imageBackground}
        resizeMode="cover"
        imageStyle={styles.imageStyle}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.categoryTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    flex: 0.47,
    height: 152,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F4F6F6',
  },
  categoryCardRight: { 
    marginLeft: 0
  },
  categoryCardBottom: { 
    marginTop: 16
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  categoryTitle: {
    maxWidth: '70%',
    fontSize: 16,
    lineHeight: 21,
    fontFamily: 'Rubik-Medium',
    color: '#13231B',
    textAlign: 'left',
  },
});

export default CategoryCard;