import { StyleSheet, Text, View } from "react-native";
import { constants } from "@/constants";
import Main from "@/components/shared/Main";

const ProfileScreen = () => {
  return (
    <Main>
      <View style={styles.container}>
        <Text style={{ color: constants.white }}>Profile</Text>
      </View>
    </Main>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});