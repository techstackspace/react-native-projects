import Main from "@/components/shared/Main";
import Home from "@/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TabBody from "@/components/FixedTab/Item";

const App = () => {
  return (
    <Main>
      <SafeAreaProvider>
        <Home />
        <TabBody />
      </SafeAreaProvider>
    </Main>
  );
};

export default App;
