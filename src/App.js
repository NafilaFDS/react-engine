import './App.css';
import HtmlView from './components/HtmlView';
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <HtmlView />
    </Provider>
  )
}
