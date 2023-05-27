import React, { useEffect } from "react";
import { Form, Input } from "antd";

const EditForm = ({ categoryName, form }) => {
  // const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item
        name="categoryName"
        // initialValue={categoryName}
        rules={[{ required: true, message: "Category name must be entered" }]}
      >
        <Input placeholder="Please enter a category name" />
      </Form.Item>
    </Form>
  );
};

export default EditForm;
