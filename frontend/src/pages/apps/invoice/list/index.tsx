// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { darken, lighten, styled } from '@mui/material/styles';

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridRowId } from "@mui/x-data-grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Third Party Imports
import format from "date-fns/format";
import DatePicker from "react-datepicker";

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteInvoice } from "src/store/apps/invoice";

// ** Types Imports
import { RootState, AppDispatch } from "src/store";
import { ThemeColor } from "src/@core/layouts/types";
import { InvoiceType } from "src/types/apps/invoiceTypes";
import { DateType } from "src/types/forms/reactDatepickerTypes";

// ** Utils Import
import { getInitials } from "src/@core/utils/get-initials";

// ** Custom Components Imports
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import OptionsMenu from "src/@core/components/option-menu";
import TableHeader from "src/views/apps/invoice/list/TableHeader";

// ** Styled Components
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

interface CustomInputProps {
  dates: Date[];
  label: string;
  end: number | Date;
  start: number | Date;
  setDates?: (value: Date[]) => void;
}

interface CellType {
  row: InvoiceType;
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const defaultColumns = [
  {
    flex: 0.1,
    field: "id",
    minWidth: 80,
    headerName: "Claim Id",
    renderCell: ({ row }: CellType) => (
      <StyledLink href={`/apps/invoice/preview/${row.id}`}>{`${row.id.substring(
        0,
        6
      )}...`}</StyledLink>
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: "invoiceStatus",
    headerName: "Status",
    renderHeader: () => <Icon icon="mdi:trending-up" fontSize={20} />,
    renderCell: (row: Object) => {
      return (
        <div>
          {row.row.status === "Pending" && (
            <CustomAvatar
              skin="light"
              color={"info"}
              sx={{ width: "1.875rem", height: "1.875rem" }}
            >
              <Icon icon="mdi:alarm" fontSize="1rem" />
            </CustomAvatar>
          )}
          {row.row.status === "Accepted" && (
            <CustomAvatar
              skin="light"
              color={"success"}
              sx={{ width: "1.875rem", height: "1.875rem" }}
            >
              <Icon icon="mdi:check" fontSize="1rem" />
            </CustomAvatar>
          )}
          {row.row.status === "Rejected" && (
            <CustomAvatar
              skin="light"
              color={"error"}
              sx={{ width: "1.875rem", height: "1.875rem" }}
            >
              <Icon icon="mdi:window-close" fontSize="1rem" />
            </CustomAvatar>
          )}
        </div>
      );
    },
  },
  {
    flex: 0.25,
    field: "name",
    minWidth: 300,
    headerName: "Description",
    renderCell: (row: Object) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography noWrap variant="caption">
              {row.row.injury_cause}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: "dateNTimeOfClaim",
    headerName: "Date & Time of Claim",
    renderCell: (row: Object) => (
      <Typography variant="body2">{row.row.created_at}</Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: "amount",
    headerName: "amount",
    renderCell: (row: Object) => {
      return (
        <Typography variant="body2" sx={{ color: "text.primary" }}>
          {"Rs. "}
          {row.row.amount}
        </Typography>
      );
    },
  },
];

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate =
    props.start !== null ? format(props.start, "MM/dd/yyyy") : "";
  const endDate =
    props.end !== null ? ` - ${format(props.end, "MM/dd/yyyy")}` : null;

  const value = `${startDate}${endDate !== null ? endDate : ""}`;
  props.start === null && props.dates.length && props.setDates
    ? props.setDates([])
    : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;

  return (
    <TextField
      fullWidth
      inputRef={ref}
      {...updatedProps}
      label={props.label || ""}
      value={value}
    />
  );
});
/* eslint-enable */

const InvoiceList = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([]);
  const [value, setValue] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [statusValue, setStatusValue] = useState<string>("");
  const [endDateRange, setEndDateRange] = useState<DateType>(null);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [startDateRange, setStartDateRange] = useState<DateType>(null);
  const [store, setStore] = useState([]);

  const getClaims = async (Q: string) => {
    const query = JSON.stringify({
      query: Q,
    });

    const response = await fetch(
      "https://capital-owl-54.hasura.app/v1/graphql",
      {
        headers: {
          "content-type": "application/json",
          "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
        method: "POST",
        body: query,
      }
    );

    const responseJson = await response.json();
    console.log(responseJson);
    setStore(
      responseJson && responseJson.data && responseJson.data.Claim
        ? responseJson.data.Claim
        : []
    );
  };
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchData({
        dates,
        q: value,
        status: statusValue,
      })
    );
    const userData = window.localStorage.getItem("userData");
    const userId = JSON.parse(userData).id;
    let Q = `query MyQuery {
      Claim(where: {user_id: {_eq: "${userId}"}}) {
        amount
        created_at
        date
        id
        injury_cause
        name
        status
        user_id
      }
    }`;
    getClaims(Q);
  }, []);

  const handleFilter = (val: string) => {
    setValue(val);
  };
  const userDataVal = JSON.parse(window.localStorage.getItem("userData"))
  const handleStatusValue = (e: SelectChangeEvent) => {
    setStatusValue(e.target.value);
    if (e.target.value === "") {
      let Q = `query MyQuery {
        Claim(where: {user_id: {_eq: "${userDataVal["id"]}"}}) {
          amount
          created_at
          date
          id
          injury_cause
          name
          status
          user_id
        }
      }`;
      getClaims(Q);
    } else {
      let Q = `query MyQuery {
        Claim(where: {user_id: {_eq: "${userDataVal["id"]}"}, _and: {_and: {status: {_eq: "${e.target.value}"}}}}) {
          amount
          created_at
          date
          id
          injury_cause
          name
          status
          user_id
        }
      }`;
      getClaims(Q);
    }
  };

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Delete Invoice">
            <IconButton
              size="small"
              onClick={() => dispatch(deleteInvoice(row.id))}
            >
              <Icon icon="mdi:delete-outline" fontSize={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton
              size="small"
              component={Link}
              href={`/apps/invoice/preview/${row.id}`}
            >
              <Icon icon="mdi:eye-outline" fontSize={20} />
            </IconButton>
          </Tooltip>
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: "small" }}
            menuProps={{ sx: { "& .MuiMenuItem-root svg": { mr: 2 } } }}
            options={[
              {
                text: "Download",
                icon: <Icon icon="mdi:download" fontSize={20} />,
              },
              {
                text: "Edit",
                href: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="mdi:pencil-outline" fontSize={20} />,
              },
              {
                text: "Duplicate",
                icon: <Icon icon="mdi:content-copy" fontSize={20} />,
              },
            ]}
          />
        </Box>
      ),
    },
  ];
  const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .super-app-theme--Open': {
      backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
      '&:hover': {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.info.main,
          theme.palette.mode,
        ),
        '&:hover': {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.info.main,
            theme.palette.mode,
          ),
        },
      },
    },
    '& .super-app-theme--Accepted': {
      backgroundColor: getBackgroundColor(
        theme.palette.success.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.success.main,
          theme.palette.mode,
        ),
        '&:hover': {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.success.main,
            theme.palette.mode,
          ),
        },
      },
    },
    '& .super-app-theme--PartiallyFilled': {
      backgroundColor: getBackgroundColor(
        theme.palette.warning.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode,
        ),
        '&:hover': {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.warning.main,
            theme.palette.mode,
          ),
        },
      },
    },
    '& .super-app-theme--Rejected': {
      backgroundColor: getBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
      '&.Mui-selected': {
        backgroundColor: getSelectedBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
        '&:hover': {
          backgroundColor: getSelectedHoverBackgroundColor(
            theme.palette.error.main,
            theme.palette.mode,
          ),
        },
      },
    },
  }));

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Filter History" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="invoice-status-select">
                      Invoice Status
                    </InputLabel>

                    <Select
                      fullWidth
                      value={statusValue}
                      sx={{ mr: 4, mb: 2 }}
                      label="Invoice Status"
                      onChange={handleStatusValue}
                      labelId="invoice-status-select"
                    >
                      <MenuItem value="">none</MenuItem>
                      <MenuItem value="Accepted">accepted</MenuItem>
                      <MenuItem value="Rejected">rejected</MenuItem>
                      <MenuItem value="Pending">pending</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label="Invoice Date"
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <StyledDataGrid
             getRowClassName={(params) => `super-app-theme--${params.row.status}`}
              autoHeight
              pagination
              rows={store}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={(rows) => setSelectedRows(rows)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default InvoiceList;
