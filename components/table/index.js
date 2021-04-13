import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Home({ children, data, onDataChange, getAllData }) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onButtonClick = (e) => {
    const selectedNodes = gridApi.getSelectedNodes();

    const [data] = selectedNodes.map((node) => node.data);

    onDataChange(data.uid);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <button onClick={onButtonClick}>Get selected rows</button>
        <button onClick={getAllData}>Get All Data</button>
        <AgGridReact
          rowStyle={{ lineHeight: 2 }}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={data}
          pagination={true}
          paginationPageSize={20}
          paginationAutoPageSize={true}>
          {children}
        </AgGridReact>
      </div>
    </>
  );
}
