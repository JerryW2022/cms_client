import React, { useState, useEffect } from "react";
import { Card, Table, Button, message } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategories, reqUpdateCategory, reqAddCategory } from "../../api";

export default function Category() {
  const [loading, setLoading] = useState(false); // 是否正在获取数据中
  const [categories, setCategories] = useState([]); // 一级分类列表
  const [subCategories, setSubCategories] = useState([]); // 二级分类列表
  const [parentId, setParentId] = useState("0"); // 当前需要显示的分类列表的父分类ID
  const [parentName, setParentName] = useState(""); // 当前需要显示的分类列表的父分类名称
  const [showStatus, setShowStatus] = useState(0); // 标识添加/更新的确认框是否显示, 0: 都不显示, 1: 显示添加, 2: 显示更新

  // 异步获取一级/二级分类列表显示
  const getCategories = async () => {
    // 在发请求前, 显示loading
    setLoading(true);
    // 发异步ajax请求, 获取数据
    const result = await reqCategories(parentId);
    // 在请求完成后, 隐藏loading
    setLoading(false);
    if (result.status === 0) {
      // 取出分类数组(可能是一级也可能二级的)
      const categories = result.data;
      if (parentId === "0") {
        // 更新一级分类状态
        setCategories(categories);
      } else {
        // 更新二级分类状态
        setSubCategories(categories);
      }
    } else {
      message.error("获取分类列表失败");
    }
  };

  // 显示指定一级分类对象的子列表
  const showSubCategories = (category) => {
    setParentId(category._id);
    setParentName(category.name);
    // getCategories();
  };

  // 显示一级分类列表
  const showCategories = () => {
    // 更新为显示一列表的状态
    setParentId("0");
    setParentName("");
    setSubCategories([]);
  };

  useEffect(() => {
    getCategories();
  }, [parentId]);

  const title =
    parentId === "0" ? (
      "Top Category"
    ) : (
      <span>
        <LinkButton onClick={showCategories}>Top Category</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    );
  const extra = (
    <Button type="primary">
      <PlusOutlined />
      Add new
    </Button>
  );
  // 初始化Table所有列的数组
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      width: 300,
      render: (category) => (
        <span>
          <LinkButton>Edit</LinkButton>
          {parentId === "0" ? (
            <LinkButton
              onClick={() => {
                showSubCategories(category);
              }}
            >
              View
            </LinkButton>
          ) : null}
        </span>
      ),
    },
  ];

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        loading={loading}
        columns={columns} //不确定？？
        dataSource={parentId === "0" ? categories : subCategories}
        rowKey="_id"
        pagination={{ defaultPageSize: 5, showQuickJumper: true }}
      />
    </Card>
  );
}
