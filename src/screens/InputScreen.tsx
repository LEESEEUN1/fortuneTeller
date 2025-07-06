import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

// 성별 선택을 위한 타입
type Gender = 'male' | 'female' | null;

const InputScreen = ({ navigation }: any) => {
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>(null);
  const [loading, setLoading] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adDismissed, setAdDismissed] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
      },
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setAdDismissed(true); // 광고가 닫혔음을 표시
        interstitial.load(); // 다음 광고를 위해 미리 로드
      },
    );

    // 첫 광고 로드
    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  useEffect(() => {
    // 광고가 닫히면 API 요청 실행
    if (adDismissed) {
      fetchFortune();
      setAdDismissed(false); // 상태 초기화
    }
  }, [adDismissed]);

  const handleShowResult = async () => {
    if (!birthDate || !gender) {
      Alert.alert('알림', '생년월일과 성별을 모두 입력해주세요.');
      return;
    }
    
    if (adLoaded) {
      interstitial.show();
    } else {
      // 광고가 로드되지 않았으면 바로 운세 결과 요청
      fetchFortune();
    }
  };

  const fetchFortune = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://fortune-teller-backend.vercel.app/fortune',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ birthDate, gender }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '운세 정보를 받아오지 못했습니다.');
      }

      navigation.navigate('Result', { fortune: data });
    } catch (error: any) {
      Alert.alert('오류', error.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>당신의 정보를 입력해주세요</Text>

        <TextInput
          style={styles.input}
          placeholder="생년월일 8자리 (예: 19900101)"
          keyboardType="number-pad"
          maxLength={8}
          value={birthDate}
          onChangeText={setBirthDate}
        />

        <View style={styles.genderContainer}>
          <Button
            title="남자"
            onPress={() => setGender('male')}
            color={gender === 'male' ? 'blue' : 'gray'}
            disabled={loading}
          />
          <Button
            title="여자"
            onPress={() => setGender('female')}
            color={gender === 'female' ? 'red' : 'gray'}
            disabled={loading}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="운세 확인하기" onPress={handleShowResult} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

export default InputScreen; 