import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import LinkButton from "../../components/link-button";
import { Card, Select, Input, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { reqProducts, reqSearchProducts } from "../../api";
import { PAGE_SIZE } from "../../utils/constants.js";

const { Option } = Select;
const { Search } = Input;

/*
Product的默认子路由组件
 */
export default function ProductHome() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(""); //total numbers of products
  const [loading, setLoading] = useState(false);
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
      {
        title: "Product name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "desc",
      },
      {
        title: "Price",
        dataIndex: "price",
        render: (price) => "$" + price,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (status) => (
          <Space size="small" direction="vertical">
            <Button type="primary">Out of Stock</Button>
            <span>On sale</span>
          </Space>
        ),
        width: 100,
      },
      {
        title: "Action",
        key: "action",
        render: () => (
          <Space size="small" direction="vertical">
            <LinkButton onClick={navigateToProductDetail}>Detail</LinkButton>
            <LinkButton>Edit</LinkButton>
          </Space>
        ),
        width: 100,
      },
    ],
    [navigateToProductDetail]
  );

  const onSelectSearchByType = useCallback(
    (value) => {
      setSearchType(value);
    },
    [setSearchType]
  );

  const onSearchClick = useCallback(
    async (value) => {
      setSearchKeyword(value);
      setLoading(true); //show loading
      const result = await reqSearchProducts({
        pageNum: 1,
        pageSize: PAGE_SIZE,
        searchKeyword: value,
        // searchType: searchType, 以下是缩写
        searchType,
      });

      // 如果搜索关键字有值, 说明我们要做搜索分页
      if (result.status === 0) {
        // 取出分页数据, 更新状态, 显示分页列表
        const { total, list } = result.data;
        setTotal(total);
        setProducts(list);
      }
      setLoading(false); //hide loading
    },
    [setSearchKeyword, searchType]
  );

  const onPaginationClick = useCallback(
    async (pageNum) => {
      setLoading(true); //show loading
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
      setLoading(false); //hide loading
    },
    [searchKeyword, searchType]
  );


  // page init get products
  useEffect(() => {
    // 组件挂载后获取数据
    const initProducts = async () => {
      setLoading(true); //show loading
      const result = await reqProducts(1, PAGE_SIZE);
      if (result.status === 0) {
        // 取出分页数据, 更新状态, 显示分页列表
        const { total, list } = result.data;
        setTotal(total);
        setProducts(list);
        setLoading(false); //hide loading
      }
    };

    initProducts();
  }, []);

  const title = (
    <span>
      <Select
        value={searchType}
        style={{ width: 190, margin: "0 15px" }}
        onChange={onSelectSearchByType}
      >
        <Option value="productName">Search by name</Option>
        <Option value="productDesc">Search by description</Option>
      </Select>
      <Search
        placeholder="input search text"
        onSearch={onSearchClick}
        /*  onChange={(event) => {
          console.log(event.target.value);//T
          setSearchKeyword(event.target.value);
          console.log('searchKeyword', searchKeyword);//""
        }} */
        style={{ width: 500 }}
      />
    </span>
  );
  const extra = (
    <Button type="primary">
      <PlusOutlined />
      Add new
    </Button>
  );
  return (
    <Card title={title} extra={extra}>
      <Table
        rowKey="_id"
        bordered
        loading={loading}
        dataSource={products}
        columns={tableFormat}
        pagination={{
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          total,
          // onChange: (pageNum) => { getProducts(pageNum) },
          //简化代码：在这种简写形式中，onChange 事件会将事件对象（在这种情况下，是 pageNum 参数）作为参数传递给 getProducts 函数。因为参数是直接传递的，所以不需要额外的箭头函数来包裹。简化后的代码会在 onChange 事件发生时调用 getProducts 函数，并将相应的参数传递给它。
          onChange: onPaginationClick,
        }}
      />
    </Card>
  );
}
