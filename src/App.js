// import logo from './logo.svg';
// import './App.css';
// import { ChatWindow } from './ChatWindow';

// function App() {
//   return (
//     <div className="App">
//     <ChatWindow />
//     <ChatWindow />
//     <ChatWindow />
//   </div>
//   );
// }

// export default App;


// App.js
import React from 'react';
import './App.css';
import { ChatWindowManager } from './ChatWindowManager'; // Make sure the path is correct

function App() {
  return (
    <div className="App">
      <ChatWindowManager />
    </div>
  );
}

export default App;