import React, { useState, useEffect } from "react";
import { Card, Table, Button, message, Modal, Form } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";
import { reqCategories, reqUpdateCategory, reqAddCategory } from "../../api";
import AddForm from "./add-form";
import EditForm from "./edit-form";

export default function Category() {
  const [loading, setLoading] = useState(false); // 是否正在获取数据中
  const [categories, setCategories] = useState([]); // Top Categories列表
  const [subCategories, setSubCategories] = useState([]); // 二级分类列表
  const [parentId, setParentId] = useState("0"); // 当前需要显示的分类列表的父分类ID
  const [parentName, setParentName] = useState(""); // 当前需要显示的分类列表的父分类名称
  const [isModalOpen, setIsModalOpen] = useState(0); // 标识add/edit的确认框是否显示, 0: 都不显示, 1: 显示add, 2: 显示edit
  const [category, setCategory] = useState({});

  const [form] = Form.useForm();

  // 初始化Table所有列的数组
  const initColumns = () => {
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
            <LinkButton
              onClick={() => {
                showEdit(category);
              }}
            >
              Edit
            </LinkButton>
            {parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  viewSubCategory(category);
                  // console.log(category);
                }}
              >
                View
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
    return columns;
  };

  /*
  异步获取一级/二级分类列表显示
   */
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
        // 更新Top Categories状态
        setCategories(categories);
      } else {
        // 更新二级分类状态
        setSubCategories(categories);
      }
    } else {
      message.error("Failed to get category list");
    }
  };

  // View sub category
  const viewSubCategory = (category) => {
    setParentId(category._id);
    setParentName(category.name);
  };

  // 显示Top Categories列表
  const showTopCategories = () => {
    // 更新为显示一列表的状态
    setParentId("0");
    setParentName("");
    setSubCategories([]);
  };

  // Modal对话框点击取消按钮
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(0);
  };

  // 显示Add new的确认框
  const showAddNew = () => {
    setIsModalOpen(1);
  };

  // Add new category
  const addCategory = async () => {
    try {
      const values = await form.validateFields();
      setIsModalOpen(0);
      // 收集数据, 并提交添加分类的请求
      // console.log(values);
      const { parentId, categoryName } = values;
      setParentId(parentId);
      if (parentId !== "0") {
        // getCategories(parentId)
        const targetCategory = categories.find(
          (category) => category._id === parentId
        );
        if (targetCategory) {
          const targetName = targetCategory.name;
          // console.log(targetName);
          setParentName(targetName);
        } else {
          console.log("No matching category found");
        }
      }

      // 清除Modal输入的数据
      form.resetFields();
      //add it to database
      reqAddCategory(categoryName, parentId);
      getCategories();
    } catch (error) {
      console.log("Form validation error", error);
    }
  };

  // 显示Edit的确认框
  const showEdit = (category) => {
    setCategory(category);
    setIsModalOpen(2);
  };

  // Edit分类
  const editCategory = async () => {
    try {
      const values = await form.validateFields();
      setIsModalOpen(0);
      const categoryId = category._id;
      const { categoryName } = values;
      const result = await reqUpdateCategory({ categoryId, categoryName });
      if (result.status === 0) {
        getCategories();
      }
    } catch (error) {
      console.log("Form validation error", error);
    }
  };

  useEffect(() => {
    initColumns();
    getCategories();
  }, [parentId]);

  const title =
    parentId === "0" ? (
      "Top Category"
    ) : (
      <span>
        <LinkButton onClick={showTopCategories}>Top Category</LinkButton>
        <ArrowRightOutlined style={{ marginRight: 5 }} />
        <span>{parentName}</span>
      </span>
    );
  const extra = (
    <Button type="primary" onClick={showAddNew}>
      <PlusOutlined />
      Add new
    </Button>
  );

  return (
    <Card title={title} extra={extra}>
      <Table
        bordered
        loading={loading}
        columns={initColumns()}
        dataSource={parentId === "0" ? categories : subCategories}
        rowKey="_id"
        pagination={{ defaultPageSize: 8, showQuickJumper: true }}
      />
      <Modal
        forceRender
        title="Add new category"
        open={isModalOpen === 1}
        onOk={addCategory}
        onCancel={handleCancel}
      >
        <AddForm categorys={categories} parentId={parentId} form={form} />
      </Modal>
      <Modal
        forceRender
        title="Edit category"
        open={isModalOpen === 2}
        onOk={editCategory}
        onCancel={handleCancel}
      >
        <EditForm categoryName={category.name} form={form} />
      </Modal>
    </Card>
  );
}
