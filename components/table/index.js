import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function Table({ children, data, onDataChange, getAllData }) {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onButtonClick = (e) => {
    const [data] = gridApi.getSelectedRows();
    onDataChange(data.uid);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div className="my-5">
      <div className="ag-theme-alpine" style={{ height: '50vh', width: '100%' }}>
        <button
          className="py-2 px-4 rounded-md shadow-md text-white bg-blue-400 hover:bg-blue-500 my-5"
          onClick={getAllData}>
          Clear Filter
        </button>
        <AgGridReact
          rowStyle={{ lineHeight: 2 }}
          onGridReady={onGridReady}
          rowSelection="single"
          rowData={data}
          pagination={true}
          paginationPageSize={20}
          onSelectionChanged={onButtonClick}
          paginationAutoPageSize={true}>
          {children}
        </AgGridReact>
      </div>
    </div>
  );
}
