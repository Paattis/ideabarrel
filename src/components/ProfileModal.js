import * as React from 'react';
import { Divider, Modal, Portal, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';

const ProfileModal = ({
  visible,
  hideModal,
  name,
  role,
  groups = null,
  children,
}) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const backGroundStyle = {
    backgroundColor: theme.colors.background,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.containerStyle, backGroundStyle]}
      >
        <Text style={styles.titleText}>{name}</Text>
        <View style={styles.contentContainerStyle}>
          {children}

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text}>{role}</Text>
            <Text style={styles.text}>TEst</Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexGrow: 1,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    elevation: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentContainerStyle: { flexDirection: 'row' },
});

ProfileModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  name: PropTypes.string,
  role: PropTypes.string,
  groups: PropTypes.string,
  children: PropTypes.node,
};
export default ProfileModal;
