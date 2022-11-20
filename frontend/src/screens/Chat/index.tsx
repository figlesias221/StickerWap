import ChatComponent from 'components/ChatComponent';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import i18n from 'translations';

import socket from 'utils/socket';
import styles from './styles';
import spacingStyles from 'styles/spacing';

const Chat = () => {
  const [chats, setChats] = useState<any>([]);
  const { id } = useSelector((state: RootState) => state.auth.data);

  useLayoutEffect(() => {
    socket.emit('chatList', id);
    socket.on('foundChatList', (chatList: any) => {
      setChats(chatList);
    });
  }, []);

  useEffect(() => {
    socket.emit('chatList', id);
    socket.on('foundChatList', (chatList: any) => {
      setChats(chatList);
    });

    return () => {
      socket.off('foundChatList');
    };
  }, [socket]);

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <Text style={styles.subtitle}>{i18n.t('chat.title')}</Text>

      <View style={styles.chatlistContainer}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={item => item._id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.emptyText}>{i18n.t('chat.no-chats')}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
