import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchExpenses} from '../redux/slices/expenseSlice';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native-paper';
import TransactionCard from '../component/TransactionCard';

const HomeScreen = ({user, navigation}) => {
  const dispatch = useDispatch();
  const {expenses, status, error} = useSelector(state => state.expense);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchExpenses(user.id));
    }, [dispatch, user.id]),
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, user.id, status]);

  // Ensure expenses.data is defined and an array
  const expensesData = expenses?.data ?? [];

  const credits = expensesData.filter(
    item => item.attributes.transaction_type === 'credit',
  );
  const debits = expensesData.filter(
    item => item.attributes.transaction_type === 'debit',
  );

  const totalCredits = credits.reduce(
    (sum, item) => sum + parseFloat(item.attributes.amount),
    0,
  );
  const totalDebits = debits.reduce(
    (sum, item) => sum + parseFloat(item.attributes.amount),
    0,
  );
  let balance = totalCredits - totalDebits;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f72585', '#b5179e', '#4cc9f0']}
        style={styles.linearGradient}
        start={{y: 0.2, x: 0.6}}
        end={{y: 0.3, x: 0.3}}
        useAngle={true}
        angle={45}>
        <View style={styles.heroSection}>
          <Icon
            name="menu"
            size={28}
            color="#fff"
            onPress={() => navigation.toggleDrawer()}
          />
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.userName}>Hey, {user.username}</Text>
            <Text style={styles.welcomText}>Welcome Back !!</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Icon name="wallet" size={25} color="#fff" />
            <Text style={styles.balanceText}>₹ {balance}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('Credits', {creditsData: credits})
          }>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Income</Text>
              <Text style={styles.cardDescription}>₹ {totalCredits}</Text>
            </View>
            <Icon name="trending-up" size={28} color="#679436" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Debits', {debitsData: debits})}>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Debit</Text>
              <Text style={styles.cardDescription}>₹ {totalDebits}</Text>
            </View>
            <Icon name="trending-down" size={28} color="#d80032" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionContainer}>
        <Text style={styles.heading}>Recent Transactions</Text>
        <Text>{expensesData.length}</Text>
      </View>

      {status === 'loading' && (
        <ActivityIndicator
          size="small"
          color="#0000ff"
          style={{marginTop: 20}}
        />
      )}
      {status === 'failed' && <Text>{error}</Text>}
      {status === 'succeeded' && expensesData.length === 0 && (
        <Text>No transactions found.</Text>
      )}
      {status === 'succeeded' && expensesData.length > 0 && (
        <>
          <TransactionCard data={expensesData} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    padding: 20,
    justifyContent: 'space-between',
  },
  linearGradient: {
    width: '100%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  welcomeTextContainer: {
    marginVertical: 40,
  },
  userName: {
    fontSize: 18,
    color: '#fff',
  },
  welcomText: {
    fontSize: 26,
    lineHeight: 48,
    color: '#fff',
    fontWeight: '700',
  },
  balanceText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginTop: -40,
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    paddingVertical: 20,
    borderRadius: 10,
    width: 160,
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 24,
    fontWeight: '600',
  },
  transactionContainer: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
});
