import React, { useEffect, Component } from 'react';
import { setToken, call } from '../services/api';

const App = () => {
  useEffect(() => {
    async function fetchData() {
      const result = await call('post', 'auth/login', {
        username: 'kevin',
        password: 'password',
      });

      console.log(result);
    }

    fetchData();
  }, []);

  return <div>App Works</div>;
};

// class App extends Component {
//   async componentDidMount() {
//     const result = await call('post', 'auth/login', {
//       username: 'kevin',
//       password: 'password',
//     });
//     console.log(result);
//   }

//   render() {
//     return <div>App Works</div>;
//   }
// }
export default App;
