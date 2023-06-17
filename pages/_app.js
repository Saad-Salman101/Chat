import store from "@/src/store";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}
