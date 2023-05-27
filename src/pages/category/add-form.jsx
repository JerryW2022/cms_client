import React, { useEffect } from "react";
import { Form, Select, Input } from "antd";
const { Option } = Select;

const AddForm = ({ form, categorys, parentId }) => {
//   const [form] = Form.useForm();

  //   useEffect(() => {
  //     setForm(form);
  //   }, [form, setForm]);

  return (
    <Form form={form}>
      <Form.Item name="parentId" initialValue={parentId}>
        <Select>
          <Option value="0">Top Category</Option>
          {categorys.map((c) => (
            <Option key={c._id} value={c._id}>
              {c.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="categoryName"
        initialValue=""
        rules={[{ required: true, message: "Category name must be entered" }]}
      >
        <Input placeholder="Please enter a category name" />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
