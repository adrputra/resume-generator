import "@/styles.css";
import { ContextProvider } from "@/context";

export default function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps}/>
    </ContextProvider>
  );
}
