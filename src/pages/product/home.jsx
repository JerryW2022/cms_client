import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  MenuItem,
  Card,
  CardHeader,
  Select,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts } from "../../api";
import { PAGE_SIZE } from "../../utils/constants.js";

/*
Product的默认子路由组件
 */

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
export default function ProductHome() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(""); //total numbers of products
  // const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); //search keyword
  const [searchType, setSearchType] = useState("productName"); //selected type
  // const [product, setProduct] = useState({});

  const navigate = useNavigate();

  const navigateToProductDetail = useCallback(() => {
    navigate("/product/detail");
  }, [navigate]);

  /* useMemo第一个参数是一个回调函数，用于进行需要进行 memoization（记忆化）的计算逻辑。第二个参数是一个依赖数组，用于指定在依赖项发生变化时，才重新执行回调函数进行计算。如果依赖项数组为空，则回调函数只会在组件首次渲染时执行一次。 */
  const tableFormat = useMemo(
    () => [
      { field: "_id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Product name",
        width: 150,
        editable: true,
      },
      {
        field: "desc",
        headerName: "Description",
        width: 200,
      },
      {
        field: "price",
        headerName: "Price",
        type: "number",
        width: 110,
        valueGetter: (params) => <Typography>{"$" + params.value}</Typography>,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: () => (
          <Stack direction="column" spacing={1}>
            <Button variant="contained" color="primary">
              Out of Stock
            </Button>
            <Typography variant="body2">On sale</Typography>
          </Stack>
        ),
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: () => (
          <Stack direction="column" spacing={1}>
            <LinkButton onClick={navigateToProductDetail}>Detail</LinkButton>
            <LinkButton>Edit</LinkButton>
          </Stack>
        ),
      },
    ],
    [navigateToProductDetail]
  );

  const onSelectSearchByType = useCallback(
    (event) => {
      setSearchType(event.target.value);
    },
    [setSearchType]
  );

  const onSearchKeyword = useCallback(
    (event) => {
      // console.log(event.target.value);
      setSearchKeyword(event.target.value);
    },
    [setSearchKeyword]
  );

  const onSearchClick = useCallback(async () => {
    // setLoading(true); //show loading
    const result = await reqSearchProducts({
      pageNum: 1,
      pageSize: PAGE_SIZE,
      searchKeyword,
      searchType,
    });

    if (result.status === 0) {
      const { total, list } = result.data;
      setTotal(total);
      setProducts(list);
    }
    // setLoading(false); //hide loading
  }, [searchType, searchKeyword]);

  const onPaginationClick = useCallback(
    async (pageNum) => {
      // setLoading(true); //show loading
      const result = await reqSearchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchKeyword,
        searchType,
      });
      if (result.status === 0) {
        // 取出分页数据, 更新状态, 显示分页列表
        const { total, list } = result.data;
        setTotal(total);
        setProducts(list);
      }
      // setLoading(false); //hide loading
    },
    [searchKeyword, searchType]
  );

  // page init get products
  useEffect(() => {
    // 组件挂载后获取数据
    const initProducts = async () => {
      // setLoading(true); //show loading
      const result = await reqProducts(1, PAGE_SIZE);
      if (result.status === 0) {
        // 取出分页数据, 更新状态, 显示分页列表
        const { total, list } = result.data;
        setTotal(total);
        setProducts(list);
        // setLoading(false); //hide loading
      }
    };

    initProducts();
  }, []);

  const title = (
    <Stack direction="row" spacing={2}>
      <FormControl>
        <InputLabel id="searchType-label">Search Type</InputLabel>
        <Select
          labelId="searchType-label"
          label="Search Type"
          value={searchType}
          onChange={onSelectSearchByType}
        >
          <MenuItem value={"productName"}>Search by name</MenuItem>
          <MenuItem value={"productDesc"}>Search by description</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Search field"
        type="search"
        variant="filled"
        value={searchKeyword}
        onChange={onSearchKeyword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={onSearchClick}>
        <SearchIcon />
      </Button>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Add new
      </Button>
    </Stack>
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardHeader title={title} />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Card>
  );
}
