import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TransactionCard from '../component/TransactionCard';
import {COLORS} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const DebitScreen = ({route, navigation}) => {
  const debitsData = route.params.debitsData;
  const currentDate = new Date();

  const totalDebits = debitsData.reduce(
    (sum, item) => sum + parseFloat(item.attributes.amount),
    0,
  );
  return (
    <>
      <View>
        <LinearGradient
          colors={['#590d22', '#c9184a', '#590d22']}
          style={styles.linearGradient}
          start={{y: 0.0, x: 1.6}}
          end={{y: 0.0, x: 1.6}}
          useAngle={true}
          angle={57}>
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
                Current debits till {currentDate.toDateString()}
              </Text>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>₹ {totalDebits}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
      <TransactionCard data={debitsData} />
    </>
  );
};

export default DebitScreen;

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
