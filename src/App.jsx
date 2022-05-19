import React from 'react';

import TicketList from './components/ticket-list';
import Filter from './components/filter';
import Tabs from './components/tabs';
import 'antd/dist/antd.css';

const App = function App() {
  return (
    <main className="container">
      <div className="logo" />
      <section className="section">
        <Filter />
        <div className="flex-wrapper">
          <Tabs />
          <TicketList />
        </div>
      </section>
    </main>
  );
};

export default App;
