import type { AppProps } from "next/app";
import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from '../contexts/AuthContext';
import { SearchHistoryProvider } from "@/contexts/SearchHistoryContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SearchHistoryProvider>
        <Component {...pageProps} />
      </SearchHistoryProvider>
    </AuthProvider>
  );
}

export default MyApp;
