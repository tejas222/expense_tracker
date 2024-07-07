import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TransactionCard from '../component/TransactionCard';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import formatDate from '../utils/formatDate';
import {COLORS} from '../utils/colors';

const IncomeScreen = ({route, navigation}) => {
  const creditsData = route.params.creditsData;
  const currentDate = new Date();

  const totalCredits = creditsData.reduce(
    (sum, item) => sum + parseFloat(item.attributes.amount),
    0,
  );

  return (
    <>
      <View>
        <LinearGradient
          colors={['#004b23', '#2b9348', '#004b23']}
          style={styles.linearGradient}
          start={{y: 0.0, x: 0.0}}
          end={{y: 0.0, x: 0.0}}
          useAngle={true}
          angle={47}>
          <View style={styles.navButton}>
            <Icon
              name="arrow-back"
              size={30}
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.heroSection}>
            <View>
              <Text style={styles.title}>
                Current credits till {currentDate.toDateString()}
              </Text>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>₹ {totalCredits}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
      <TransactionCard data={creditsData} />
    </>
  );
};

export default IncomeScreen;

const styles = StyleSheet.create({
  navButton: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  heroSection: {
    padding: 10,
  },
  linearGradient: {
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  title: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 15,
  },
  balanceText: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.white,
  },
});
