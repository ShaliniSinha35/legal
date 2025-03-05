import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { AppContext } from '../context/AppContext';

export const CourtSelect = () => {
  const courtType = ['High Court', 'District Court'];

  const { court, setCourt } = useContext(AppContext);
  console.log(court);

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  return (
    <Layout style={{ alignItems: 'center' }}>
      <Layout style={styles.container} level="1">
        <Select
          status="warning"
          selectedIndex={selectedIndex}
          value={court || courtType[selectedIndex.row]}  
          onSelect={(index) => {
            setSelectedIndex(index);
            setCourt(courtType[index.row]); // Correctly updating state
          }}
        >
          {courtType.map((court, index) => (
            <SelectItem key={index} title={court} />
          ))}
        </Select>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 200,
  },
});
