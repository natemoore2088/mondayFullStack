import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { TabsContext, TabList, Tab, TabPanels, TabPanel } from "monday-ui-react-core";
import CustomForm from "./components/CustomForm";
import FragranceManager from "./components/FragranceManager";
import useFragrances from "./hooks/useFragrances";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { fragrances, loading, error, fetchFragrances, createFragrance, updateFragrance, deleteFragrance } = useFragrances();
  const [context, setContext] = useState();
  const MONDAY_API_KEY=process.env.REACT_APP_MONDAY_TOKEN;

  useEffect(() => {
    // monday.setToken(MONDAY_API_KEY)
    monday.listen("context", (res) => {
      setContext(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    fetchFragrances();
  }, [fetchFragrances]);

  const handleTabChange = useCallback((newTabIndex) => {
    setActiveTab(newTabIndex);
    fetchFragrances(); // Refresh data when changing tabs
  }, [fetchFragrances]);
  console.log(context)
  return (
    <div className="App">
      <TabsContext activeTabId={activeTab} onChange={handleTabChange}>
        <TabList className="tab-header">
          <Tab>Custom Form</Tab>
          <Tab>Fragrance Manager</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CustomForm 
              fragrances={fragrances}
              loading={loading}
              error={error}
            />
          </TabPanel>
          <TabPanel>
            <FragranceManager 
              fragrances={fragrances}
              loading={loading}
              error={error}
              createFragrance={createFragrance}
              updateFragrance={updateFragrance}
              deleteFragrance={deleteFragrance}
              refreshFragrances={fetchFragrances}
            />
          </TabPanel>
        </TabPanels>

      </TabsContext>
    </div>
  );
};

export default App;