import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import LinkButton from "../../components/link-button";

const { Item } = List;

/*
Product的详情子路由组件
 */

export default function ProductDedail() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const title = (
    <span>
      <LinkButton>
        <ArrowLeftOutlined
          style={{ marginRight: 10, fontSize: 20 }}
          onClick={goBack}
        />
      </LinkButton>
      <span>Product detail</span>
    </span>
  );
  return (
    <Card title={title} className="product-detail">
      <List>
        <Item>
          <span className="left">Product Name:</span>
          <span>ThinkPad 480</span>
        </Item>
        <Item>
          <span className="left">Product Description:</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            exercitationem{" "}
          </span>
        </Item>
        <Item>
          <span className="left">Product Price:</span>
          <span>60000AUD</span>
        </Item>
        <Item>
          <span className="left">Product Category:</span>
          <span>Computer --&gt; Laptop </span>
        </Item>
        <Item>
          <span className="left">Pictures:</span>
          <span>
            <img
              className="product-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5heZIVYjVgySznyoJ6eXnAiyIckOp-LALfgS85xBGT_btUS5cl5L4vTmJY7G3fxidfQE&usqp=CAU"
              alt="img"
            />
            <img
              className="product-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5heZIVYjVgySznyoJ6eXnAiyIckOp-LALfgS85xBGT_btUS5cl5L4vTmJY7G3fxidfQE&usqp=CAU"
              alt="img"
            />
          </span>
        </Item>
        <Item>
          <span className="left">Product Detail:</span>
          <span
            dangerouslySetInnerHTML={{ __html: "<h1>Title of product</h1>" }}
          ></span>
        </Item>
      </List>
    </Card>
  );
}
