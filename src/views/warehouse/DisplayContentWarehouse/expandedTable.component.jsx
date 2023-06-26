import DataTable, { createTheme } from "react-data-table-component";
import './style.css'




export const ExpandedDataTable = ({ data }) => {
  { console.log(data) }
  createTheme('myTheme', {
    rows: {
      fontSize: '16px',
    },

  });

  const columns1 = [
    {
      name: 'الصاعقة 1',
      // selector: row => row['warehouse_id'],
      // sortable: true,
      // headerClass: 'name-column'
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];



  const columns2 = [
    {
      name: 'الصاعقة 2',
      // selector: row => row['warehouse_id'],
      // sortable: true,
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];


  const columns3 = [
    {
      name: 'صاعقة 3',
      // selector: row => row['warehouse_id'],
      // sortable: true,
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];

  const columns4 = [
    {
      name: 'البراد الصفري',
      // selector: row => row['warehouse_id'],
      // sortable: true,
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];
  const columns5 = [
    {
      name: 'المخزن',
      // selector: row => row['warehouse_id'],
      // sortable: true,
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];
  const columns6 = [
    {
      name: 'البحرات',
      // selector: row => row['warehouse_id'],
      // sortable: true,
    },
    {
      name: 'الوزن',
      selector: row => row['weight'],
      sortable: true,
    },
  ];

  const tableData = [data.detonator_frige1];
  const tableData2 = [data.detonator_frige2];
  const tableData3 = [data.detonator_frige3];
  const tableData4 = [data.zero_frige];
  const tableData5 = [data.store];
  const tableData6 = [data.lake];

  return (
    <div>
      <DataTable

        title="Data Table"
        columns={columns1}
        data={tableData}
        theme="myTheme"


        noHeader
      />
      <DataTable
        title="Data Table"
        columns={columns2}
        data={tableData2}
        theme="myTheme"

        noHeader
      />
      <DataTable
        title="Data Table"
        columns={columns3}
        data={tableData3}
        theme="myTheme"

        noHeader
      />
      <DataTable
        title="Data Table"
        columns={columns6}
        data={tableData6}
        theme="myTheme"

        noHeader
      />
      <DataTable
        title="Data Table"
        columns={columns5}
        data={tableData5}
        theme="myTheme"

        noHeader
      />
      <DataTable
        title="Data Table"
        columns={columns4}
        data={tableData4}
        theme="myTheme"

        noHeader
      />
    </div>

  );
};