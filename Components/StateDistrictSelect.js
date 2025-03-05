import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { api } from '../ApiUrl';

export const StateDistrictSelect = () => {
  const {
    selectState,
    setSelectState,
    selectDistrict,
    setSelectDistrict,
    allDistricts,
    setAllDistricts,
  } = useContext(AppContext);

  const [selectedStateIndex, setSelectedStateIndex] = useState(new IndexPath(0));
  const [selectedDistrictIndex, setSelectedDistrictIndex] = useState(new IndexPath(0));
  const [allStates, setAllStates] = useState([]);

  const selectedStateName = selectState || allStates[selectedStateIndex.row]?.name || 'Select a State';
  const selectedDistrictName = selectDistrict || allDistricts[selectedDistrictIndex.row]?.name || 'Select a District';

  // 🔹 Fetch States on Component Mount
  useEffect(() => {
    const getAllStates = async () => {
      try {
        const res = await axios.get(`${api}/states`);
        setAllStates(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllStates();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (allStates.length === 0) return; // Ensure states are loaded
      const selectedStateId = allStates[selectedStateIndex.row]?.sid;
      if (!selectedStateId) return;

  
      setAllDistricts([]);
      setSelectDistrict(null);
      setSelectedDistrictIndex(new IndexPath(0));

      try {
        const res = await axios.get(`${api}/districts?sid=${selectedStateId}`);
        setAllDistricts(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDistricts();
  }, [selectedStateIndex, allStates]);

  return (
    <Layout style={styles.container} level="1">
      {/* State Select Dropdown */}
      <Select
        style={styles.select}
        placeholder="Select a State"
        value={selectedStateName}
        selectedIndex={selectedStateIndex}
        onSelect={(index) => {
          setSelectedStateIndex(index);
          setSelectState(allStates[index.row]?.name);
        }}
      >
        {allStates.map((state) => (
          <SelectItem key={state.sid} title={state.name} />
        ))}
      </Select>

      {/* District Select Dropdown */}
      <Select
        style={styles.select}
        placeholder="Select a District"
        value={selectedDistrictName}
        selectedIndex={selectedDistrictIndex}
        onSelect={(index) => {
          setSelectedDistrictIndex(index);
          setSelectDistrict(allDistricts[index.row]?.name);
        }}
        disabled={allDistricts.length === 0 && selectState !== null} // ✅ Fix: Enable dropdown as soon as a state is selected
      >
        {allDistricts.length > 0
          ? allDistricts.map((district) => (
              <SelectItem key={district.did} title={district.name} />
            ))
          : [<SelectItem key="loading" title="Loading districts..." disabled />]}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  select: {
    flex: 1,
    margin: 2,
  },
});
