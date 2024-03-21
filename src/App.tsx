import { Outlet } from 'react-router-dom';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.appContainer}>
      <Outlet />
    </div>
  );
}

export default App;
