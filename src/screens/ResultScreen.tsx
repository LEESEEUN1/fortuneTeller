import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ResultScreen = ({ route }: any) => {
  const { fortune } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>✨ 당신의 오늘 운세 ✨</Text>
      <View style={styles.card}>
        <Text style={styles.description}>{fortune.description}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>❤️ 행운의 색상: {fortune.color}</Text>
          <Text style={styles.infoText}>🤔 오늘의 기분: {fortune.mood}</Text>
          <Text style={styles.infoText}>🔢 행운의 숫자: {fortune.lucky_number}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%',
  },
  date: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'right',
    marginBottom: 15,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
  infoContainer: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ResultScreen; 