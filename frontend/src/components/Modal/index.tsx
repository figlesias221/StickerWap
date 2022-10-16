import React from 'react';
import { View, Modal as RNModal } from 'react-native';
import styles from './styles';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Modal = ({ children, visible, setVisible }: ModalProps) => {
  const closeModal = () => setVisible(false);

  return (
    <RNModal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>{children}</View>
    </RNModal>
  );
};

export default Modal;
