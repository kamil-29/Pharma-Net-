import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  // GridToolbarExport
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useTheme } from "@emotion/react";
// import { exportToExcel } from "services/commonServices/ExcelExport";

export default function ListTable({
  columns,
  rows = [],
  checkboxSelection = false,
  description,
  totalSection = false,
  actionPrint,
  loading = false,
}) {
  function calculateTotal(rows, field) {
    if (!rows || rows.length === 0) {
      return 0; // Handle empty rows array
    }

    const total = rows.reduce(
      (accumulator, item) => accumulator + parseFloat(item[field] || 0),
      0
    );

    return total.toFixed(2);
  }
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        className="px-3"
        sx={{
          height: "60px",
          marginBottom: "10px ",
          marginTop: "10px ",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarFilterButton />
          {/* <GridToolbarFilterButton /> */}
          {/* <GridToolbarExport
              csvOptions={{
                fileName: "ledger",
                utf8WithBom: true,
              }}
              printOptions={{ disableToolbarButton: true }}
            /> */}
          <Button
            variant="text"
            className="gap-2"
            onClick={() =>
              exportToExcel(rows, columns, description, actionPrint)
            }
            size="small"
          >
            Export to Excel
            {/* <CloudDownloadIcon /> Export To Excel */}
          </Button>
        </div>
        <div>
          <GridToolbarQuickFilter
            className="text-dark g_border_radius"
            variant="outlined"
            size="small"
            placeholder="Search  Now "
          />
        </div>
      </GridToolbarContainer>
    );
  }
  const theme = useTheme();
  return (
    // <ThemeProvider theme={theme}>
    <div
      style={{
        height: "calc(75vh - 100px)",
      }}
      className="mb-5"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,
          // LoadingOverlay: GlobalScreenLoader
        }}
        density="compact"
        sx={{
          boxShadow: 2,
          border: 0,
          bgcolor: "#ffff",
          borderColor: theme.palette.primary.main,
          width: "100%",
          overflow: "scroll",
          marginTop: "20px",
          borderRadius: "8px",
          boxShadow: "none",
          "& .MuiDataGrid-cell:hover": {
            color: (theme) => theme.palette.primary.main,
          },
          "& .MuiDataGrid-cell": {
            display: "flex",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeadersInner": {
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            fill: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            fill: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          },
        }}
        loading={loading}
        checkboxSelection={checkboxSelection}
        // pageSizeOptions={[5, 10, 25]}
        // initialState={{
        //   paginationModel: { pageSize: 25, page: 0 },
        // }}
        hideFooter
      />
      {totalSection === false ? null : (
        <div className="my-3 row gap-3  flex-column align-items-end justify-content-end">
          <table className="invoice-table col-3">
            <tbody>
              <tr className="subtotal-row fw-600">
                <td className="fw-600 fs-7">Total Net Amount</td>
                <td className="subtotal fw-600">
                  $ {calculateTotal(rows, "netAmount")}
                </td>
              </tr>
              <tr className="subtotal-row">
                <td className=" fw-600 fs-7">Total Gross Amount</td>
                <td className="subtotal fw-600">
                  $ {calculateTotal(rows, "grossAmount")}
                </td>
              </tr>
            </tbody>
          </table>
          {/* <div className="col-2 d-flex align-tems-center gap-3">
              <div className=" fs-6">Total Net Amount</div>
              <span className="text-danger fs-6">
                {calculateTotal(rows, "netAmount")}
              </span>
            </div>
            <div className="col-2 d-flex align-tems-center gap-3">
              <div className=" fs-6">Gross Amount</div>
              <span className="text-danger fs-6">
                {calculateTotal(rows, "grossAmount")}
              </span>
            </div> */}
          {/* <div className="col-2 d-flex align-tems-center gap-3">
              <div className=" fs-6">Total Net Amount</div>
              <span className="text-danger fs-6">
                {calculateTotal(rows, "netAmount")}
              </span>
            </div> */}
        </div>
      )}
    </div>
    // </ThemeProvider>
  );
}
