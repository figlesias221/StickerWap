import { View, Text, Pressable } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from 'utils/stylesChat';

const ChatComponent = ({ item }: any) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<any>({});

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

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.userId1}</Text>
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
