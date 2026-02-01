import { ToastContainer } from "./components/atoms/toast/ToastContainer";
import { formatAdvanced, formatNamed,format } from "./utils/string-format";
function App() {

  const result1 = format('first: {0}; second: {1}', 'hello', 'word');
  
  const result2 = formatNamed('Hello {name}, you are {age} years old', { 
    name: 'John', 
    age: 30 
  });
  
  const result3 = formatAdvanced('User {0} has {count} messages', 'Alice', { count: 5 });
  const template = 'Order #{0}: {product} - ${price}';
  const result4 = formatNamed(template, { product: 'Laptop', price: '999' });
  
  const result5 = format('Hello {0}, welcome to {1}', 'Alice', 'our app');
  return (
    <>
      <div className="w-full min-h-screen bg-gray-50">
        <div className="container mx-auto">
          {result1} 
          <br />
          {result2}
          <br />
          {result3}
          <br />
          {result4}
          <br />
          {result5}
        </div>
      </div>
      <ToastContainer position="top-right" maxToasts={5} />
    </>
  );
}

export default App;
