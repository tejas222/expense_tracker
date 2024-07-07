import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Formik} from 'formik';
import {COLORS} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const validationSchema = yup.object().shape({
  identifier: yup.string().required(),
  password: yup.string().required().min(6),
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const navigation = useNavigation();

  const handleLogin = async values => {
    try {
      await dispatch(loginUser(values));
      navigation.replace('Home');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (auth.status === 'succeeded') {
      navigation.navigate('Home');
    }
  }, [auth.status, navigation]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <Text style={styles.loginHeading}>Login</Text>
          <Formik
            initialValues={{identifier: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('identifier')}
                  onBlur={handleBlur('identifier')}
                  value={values.identifier}
                />
                {touched.identifier && errors.identifier && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
                <View style={styles.loginBtnWrapper}>
                  <LinearGradient
                    colors={[
                      COLORS.gradient1,
                      COLORS.gradient2,
                      COLORS.gradient3,
                    ]}
                    style={styles.linearGradient}
                    start={{y: 0.5, x: 0.0}}
                    end={{y: 1.0, x: 0.0}}
                    useAngle={true}
                    angle={45}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.loginBtn}
                      onPress={handleSubmit}>
                      <Text style={styles.loginText}>
                        {auth.status == 'loading' ? 'Loggin In' : 'Login'}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.gray,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotPassText: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: '#333',
    fontWeight: 'bold',
  },
  signupBtn: {
    color: '#333',
    fontWeight: 'bold',
  },
  // utils
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
  error: {
    color: 'red',
    textTransform: 'capitalize',
  },
  loginHeading: {
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
  },
});
