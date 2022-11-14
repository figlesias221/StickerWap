import ChatComponent from 'components/ChatComponent';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, View, Text, FlatList } from 'react-native';

import i18n from 'translations';
import socket from 'utils/socket';
import styles from './styles';
import spacingStyles from 'styles/spacing';

const Chat = () => {
  const { t } = useTranslation();
  const [chats, setChats] = useState<any>([]);

  const handleCreateChat = (name: string) => {
    socket.emit('createChat', name);
  };

  useLayoutEffect(() => {
    function fetchGroups() {
      fetch('http://localhost:3000/chats')
        .then(res => {
          res.json().then(data => {
            setChats(data);
          });
        })
        .catch(err => console.error(err));
    }
    fetchGroups();
  }, []);

  useEffect(() => {
    socket.on('chatList', chats => {
      console.log('chats', chats);
      setChats(chats);
    });
  }, [socket]);

  return (
    <SafeAreaView style={spacingStyles.mainScreen}>
      <Text style={styles.subtitle}>{i18n.t('chat.title')}</Text>

      <View style={styles.chatlistContainer}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.emptyText}>No chats</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
