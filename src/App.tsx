/* import { BadgeExample } from "./components/atoms/badge";
 */ /* import { SpeedDialExamples } from "./components/atoms/speedDial/speedDial.example"; */
import { NotificationsExample } from "./components/atoms/notifications/notifications.example";
import { ToastContainer } from "./components/atoms/toast/ToastContainer";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-gray-50 pb-60">
        <NotificationsExample />
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
