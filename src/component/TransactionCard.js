import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import formatDate from '../utils/formatDate';

const TransactionCard = ({data}) => {
  const sortedData = [...data].sort(
    (a, b) =>
      new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.transactionCard}>
            <View style={styles.leftSection}>
              {item.attributes.transaction_type == 'credit' ? (
                <Icon name="arrow-up" size={25} color="green" />
              ) : (
                <Icon name="arrow-down" size={25} color="red" />
              )}
              <View style={styles.textSection}>
                <Text style={styles.categoryTitle}>
                  {item.attributes.category}
                </Text>
                <Text style={styles.categoryDescription}>
                  {item.attributes.description}
                </Text>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.amount}> ₹ {item.attributes.amount} </Text>
              <Text style={styles.date}>
                {formatDate(item.attributes.timestamp)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  transactionCard: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textSection: {
    marginLeft: 10,
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
