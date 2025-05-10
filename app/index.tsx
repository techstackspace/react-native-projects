import Main from "@/components/shared/Main";
import Home from "@/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <Main>
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </Main>
  );
};

export default App;
