import './App.css';
import useWindowDimensions from './windowChange';
import HtmlView from './HtmlView';
export default function App() {
  const { width } = useWindowDimensions();
  return (
    <>
      <HtmlView width={width} />
    </>
  )
}
