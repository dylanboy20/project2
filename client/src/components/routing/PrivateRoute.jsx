// // Importing Redirect from react-router-dom using named import
// import { Route, Redirect } from 'react-router-dom';
// import AuthContext from '../../context/auth/AuthContext';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const authContext = useContext(AuthContext);
//   const { isAuthenticated, loading } = authContext;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         !isAuthenticated && !loading ? (
//           <Redirect to="/login" />
//         ) : (
//           <Component {...props} />
//         )
//       }
//     />
//   );
// };


import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    <Route
      {...rest}
      element={!isAuthenticated && !loading ? <Navigate to="/login" /> : <Component />}
    />
  );
};

export default PrivateRoute;