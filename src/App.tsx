import 'semantic-ui-css/semantic.min.css';
import { Grid, GridColumn } from 'semantic-ui-react';
import './App.css';


import SidePanel from './components/SidePanel/SidePanel';
import ColorPanel from './components/ColorPanel/ColorPanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';
import { useContext, useEffect } from 'react';
import MessageStore from './stores/MessageStore';
import AuthStore from './stores/AuthStore';

function App() {

  const authStore = useContext(AuthStore);
  const messageStore = useContext(MessageStore);

  useEffect(() => {
    getUserInfo();
    messageStore.createHubConnection(authStore.CurrentUser?.token || "");

    return () => {
      messageStore.stopHubConnection();
    };
  });

  async function getUserInfo(){
    await authStore.GetUserInfoFromLocalStorage();
  }

  return (
    <Grid columns="equal" className='app'>
      <ColorPanel />
      <SidePanel />
      <GridColumn style={{ marginLeft: "1rem" }}>
        <Messages />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPanel />
      </GridColumn>
    </Grid>
  ); 
}

export default App;
