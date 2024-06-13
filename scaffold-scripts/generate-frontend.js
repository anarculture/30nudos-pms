#!/usr/bin/env node

const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

const projectStructure = {
  'src': {
    'components': {
      'Navbar.js': `
        import React from 'react';
        import { Link } from 'react-router-dom';

        const Navbar = () => (
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/customers">Customers</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
            </ul>
          </nav>
        );

        export default Navbar;
      `
    },
    'pages': {
      'Dashboard.js': `
        import React from 'react';

        const Dashboard = () => (
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Hotel Property Management System</p>
          </div>
        );

        export default Dashboard;
      `,
      'Reservations.js': `
        import React, { useState, useEffect } from 'react';
        import api from '../services/api';

        const Reservations = () => {
          const [reservations, setReservations] = useState([]);

          useEffect(() => {
            api.get('/reservations')
              .then(response => setReservations(response.data))
              .catch(error => console.error(error));
          }, []);

          return (
            <div>
              <h1>Reservations</h1>
              <ul>
                {reservations.map(reservation => (
                  <li key={reservation.id}>
                    {reservation.id} - {reservation.status}
                  </li>
                ))}
              </ul>
            </div>
          );
        };

        export default Reservations;
      `,
      'Customers.js': `
        import React, { useState, useEffect } from 'react';
        import api from '../services/api';

        const Customers = () => {
          const [customers, setCustomers] = useState([]);

          useEffect(() => {
            api.get('/customers')
              .then(response => setCustomers(response.data))
              .catch(error => console.error(error));
          }, []);

          return (
            <div>
              <h1>Customers</h1>
              <ul>
                {customers.map(customer => (
                  <li key={customer.id}>
                    {customer.name} - {customer.contactInfo}
                  </li>
                ))}
              </ul>
            </div>
          );
        };

        export default Customers;
      `,
      'Rooms.js': `
        import React, { useState, useEffect } from 'react';
        import api from '../services/api';

        const Rooms = () => {
          const [rooms, setRooms] = useState([]);

          useEffect(() => {
            api.get('/rooms')
              .then(response => setRooms(response.data))
              .catch(error => console.error(error));
          }, []);

          return (
            <div>
              <h1>Rooms</h1>
              <ul>
                {rooms.map(room => (
                  <li key={room.id}>
                    {room.roomType} - {room.status} - $ {room.price}
                  </li>
                ))}
              </ul>
            </div>
          );
        };

        export default Rooms;
      `
    },
    'services': {
      'api.js': `
        import axios from 'axios';

        const api = axios.create({
          baseURL: 'http://localhost:3000/api'
        });

        export default api;
      `
    },
    'App.js': `
      import React from 'react';
      import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
      import Navbar from './components/Navbar';
      import Dashboard from './pages/Dashboard';
      import Reservations from './pages/Reservations';
      import Customers from './pages/Customers';
      import Rooms from './pages/Rooms';

      const App = () => (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/reservations" component={Reservations} />
            <Route path="/customers" component={Customers} />
            <Route path="/rooms" component={Rooms} />
          </Switch>
        </Router>
      );

      export default App;
    `
  }
};

const createProjectStructure = (basePath, structure) => {
  Object.entries(structure).forEach(([key, value]) => {
    const newPath = path.join(basePath, key);
    if (typeof value === 'string') {
      fs.outputFileSync(newPath, value.trim());
    } else {
      fs.ensureDirSync(newPath);
      createProjectStructure(newPath, value);
    }
  });
};

const main = () => {
  const projectRoot = path.resolve(process.argv[2] || 'my-hotel-pms-frontend');
  const appName = path.basename(projectRoot);

  console.log(`Creating React app in ${projectRoot}...`);
  execSync(`npx create-react-app ${appName}`, { stdio: 'inherit' });

  console.log(`Installing additional dependencies...`);
  execSync(`cd ${appName} && npm install axios react-router-dom`, { stdio: 'inherit' });

  console.log(`Creating project structure...`);
  createProjectStructure(projectRoot, projectStructure);

  console.log(`Project structure created at ${projectRoot}`);
};

main();
