import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Image,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import i18n from 'translations';

import { styles } from 'utils/stylesChat';
import MessageComponent from 'components/MessageComponent';
import spacingStyles from 'styles/spacing';
import socket from 'utils/socket';
import { Send } from 'assets';
import api from 'utils/openUrl/api';
import { setUserData } from 'redux/slices/authSlice';

const Messaging = ({ route, navigation }: any) => {
  const { id } = useSelector((state: RootState) => state.auth.data);
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(id);
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const getUserData = () =>
    api.get('/users/me').then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      dispatch(setUserData(data.data));
    });

  useEffect(() => {
    getUserData();
  }, []);

  const { name, chatId } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: name });
    socket.emit('findChat', chatId);
    socket.on('foundChat', messages => setChatMessages(messages));
  }, []);

  useEffect(() => {
    socket.on('foundChat', messages => setChatMessages(messages));
  }, [socket]);

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    socket.emit('newMessage', {
      message,
      chat_id: chatId,
      user: id,
      timestamp: { hour, mins },
    });
  };

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.messagingscreen}>
        <View
          style={[
            styles.messagingscreen,
            { paddingVertical: 15, paddingHorizontal: 10 },
          ]}
        >
          <Text style={styles.messagingscreenTitle}>{name}</Text>
          {chatMessages[0] ? (
            <FlatList
              data={chatMessages}
              renderItem={({ item }) => (
                <MessageComponent item={item} user={user} />
              )}
              keyExtractor={item => item.text}
            />
          ) : (
            <Text style={styles.noMessages}>{i18n.t('chat.no-messages')}</Text>
          )}
        </View>

        <View style={styles.messaginginputContainer}>
          <TextInput
            style={styles.messaginginput}
            onChangeText={value => setMessage(value)}
            placeholder={i18n.t('chat.placeHolder')}
          />
          <Pressable onPress={handleNewMessage}>
            <View>
              <Image source={Send} style={{ width: 50, height: 50 }} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Messaging;
