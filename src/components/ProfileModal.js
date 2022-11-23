import * as React from 'react';
import { Button, Modal, Portal, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../theme';
const ProfileModal = ({
  visible,
  hideModal,
  navigation,
  name,
  role,
  groups = null,
  children,
}) => {
  const { isThemeDark } = useContext(PreferencesContext);
  const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  const extendedPost = () => navigation.navigate('New Post');
  const backGroundStyle = {
    backgroundColor: theme.colors.background,
  };
  const boxBackGroundStyle = {
    backgroundColor: theme.colors.inversePrimary,
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[styles.containerStyle, backGroundStyle]}
      >
        <View style={styles.buttonLayout}>
          <Button
            icon="account-edit"
            mode="contained"
            onPress={() => {
              {
                /* placeholder when going to edit profile */
              }
              extendedPost();
              hideModal();
            }}
          >
            Edit
          </Button>
        </View>
        <View style={styles.contentContainerStyleColumn}>
          {children}
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.roleText}>{role}</Text>
          <View style={[styles.boxStyle, boxBackGroundStyle]}>
            <Text style={styles.titleText}>Profile tags</Text>
            <View style={styles.tagContainerStyle}>
              {/* placeholder for tags*/}
              <View style={styles.tagsStyle}>
                <Text style={styles.tagsText}>ana bochi</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentContainerStyleColumn: {
    flexGrow: 1,
    flexDirection: 'column',
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  tagsText: { fontSize: 15 },
  roleText: { fontSize: 15, marginBottom: 10 },
  tagsStyle: {
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    padding: 4,
    marginRight: 10,
    marginTop: 10,
  },
  tagContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  boxStyle: {
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  buttonLayout: { alignItems: 'flex-end' },
});

ProfileModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  navigation: PropTypes.object,
  name: PropTypes.string,
  role: PropTypes.string,
  groups: PropTypes.string,
  children: PropTypes.node,
};
export default ProfileModal;
