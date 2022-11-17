import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from 'utils/stylesChat';
import api from 'utils/openUrl/api';

const ChatComponent = ({ item }: any) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<any>({});
  const [user, setUser] = useState<any>('');

  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigation = () => {
    navigation.navigate(
      'Messaging' as never,
      {
        chatId: item._id,
        name: item.name,
      } as never,
    );
  };

  const getUsernameById = async (id: string) => {
    await api.get(`/users/username/${id}`).then((data: any) => {
      if (data?.response?.status === 400) {
        throw data?.response?.data?.error;
      }
      setUser(data.data.user);
    });
  };

  useEffect(() => {
    getUsernameById(item.userId1);
  }, []);

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{user}</Text>
          <Text style={styles.cmessage}>{messages?.text}</Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : 'now'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
