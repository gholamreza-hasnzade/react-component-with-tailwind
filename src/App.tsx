import { ClipboardExamples } from "./components/atoms/clipboard/example/clipboard.example";
import { TabsExample } from "./components/atoms/tabs/tabs.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <TabsExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
