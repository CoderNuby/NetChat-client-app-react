import 'semantic-ui-css/semantic.min.css';
import { Grid, GridColumn } from 'semantic-ui-react';
import './App.css';


import SidePanel from './components/SidePanel/SidePanel';
import ColorPanel from './components/ColorPanel/ColorPanel';
import Messages from './components/Messages/Messages';
import MetaPanel from './components/MetaPanel/MetaPanel';
import { useContext, useEffect } from 'react';
import RootStore from './stores/RootStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  gridColor: string;
}

function AppWrapper() {
  const rootStore = useContext(RootStore);

  useEffect(() => {
    rootStore.authStore.GetUserInfoFromLocalStorage();
    rootStore.createHubConnection(rootStore.authStore.CurrentUser?.token || "");

    return () => {
      rootStore.stopHubConnection();
    };
  }, [rootStore, rootStore.authStore]);

  return <App gridColor={rootStore.userStore.appUserColorsPreferences.secondaryAppColor}/>;
}

function App(props: IProps) {

  return (
    <Grid columns="equal" className='app' style={{background: props.gridColor, minHeight: "100vh"}}>
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

export default observer(AppWrapper);
