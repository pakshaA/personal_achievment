'use client'

import { Main } from "@/components/main/main";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
