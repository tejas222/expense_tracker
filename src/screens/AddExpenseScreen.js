import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addExpense} from '../redux/slices/expenseSlice';

const expenseSchema = yup.object().shape({
  transaction_type: yup.string().required('Transaction type is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
  timestamp: yup.date().required('Timestamp is required'),
});

const AddExpenseScreen = ({navigation, user}) => {
  const dispatch = useDispatch();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {expenses, status, error} = useSelector(state => state.expense);

  const handleSubmit = async (values, actions) => {
    await dispatch(addExpense(values));
    actions.resetForm();
    navigation.goBack('Home');
  };

  return (
    <Formik
      initialValues={{
        transaction_type: '',
        category: '',
        description: '',
        amount: '',
        timestamp: new Date().toISOString().split('T')[0],
        users_permissions_user: user.id,
      }}
      validationSchema={expenseSchema}
      onSubmit={handleSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Transaction Type</Text>
          <Picker
            selectedValue={values.transaction_type}
            onValueChange={handleChange('transaction_type')}
            onBlur={handleBlur('transaction_type')}
            style={styles.input}>
            <Picker.Item label="Select type" value="" />
            <Picker.Item label="Credit" value="credit" />
            <Picker.Item label="Debit" value="debit" />
          </Picker>
          {touched.transaction_type && errors.transaction_type ? (
            <Text style={styles.error}>{errors.transaction_type}</Text>
          ) : null}

          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={values.category}
            onValueChange={handleChange('category')}
            onBlur={handleBlur('category')}
            style={styles.input}>
            <Picker.Item label="Select category" value="" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Grocery" value="Grocery" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          {touched.category && errors.category ? (
            <Text style={styles.error}>{errors.category}</Text>
          ) : null}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
          />
          {touched.description && errors.description ? (
            <Text style={styles.error}>{errors.description}</Text>
          ) : null}

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('amount')}
            onBlur={handleBlur('amount')}
            value={values.amount}
            keyboardType="numeric"
          />
          {touched.amount && errors.amount ? (
            <Text style={styles.error}>{errors.amount}</Text>
          ) : null}

          <Text style={styles.label}>Timestamp</Text>
          <TextInput
            style={styles.input}
            value={values.timestamp}
            onFocus={() => setShowDatePicker(true)}
            onBlur={handleBlur('timestamp')}
          />
          {touched.timestamp && errors.timestamp ? (
            <Text style={styles.error}>{errors.timestamp}</Text>
          ) : null}

          {showDatePicker && (
            <DateTimePicker
              value={new Date(values.timestamp)}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setFieldValue(
                    'timestamp',
                    selectedDate.toISOString().split('T')[0],
                  );
                }
              }}
            />
          )}

          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default AddExpenseScreen;
