import ImageGalleryExample from "./components/atoms/image/image-gallery-example";
import { PanelExamples } from "./components/atoms/panel/panel-examples";
import { PanelTest } from "./components/atoms/panel/panel-test";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";
function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <PanelTest />
        {/* <ImageTest /> */}
        {/* <ImageExamples /> */}
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
