import { Form, Input, Button } from "antd";
import { Select } from "antd";
import React, { useState } from "react";

// const { Option } = Select;

const CreateForm = ({ name, description, categories, setName, setDescription, setCategories, tx, writeContracts }) => {
  //   const onFinishFailed = errorInfo => {
  //     console.log("Failed:", errorInfo);
  //   };

  const children = [];

  const [load, setLoad] = useState(false);

  function handleChange(value) {
    console.log(`selected ${value}`);
    // console.log(typeof value);
    // typeof value === "string" ? setCategories(value) : setCategories(value.join(","));
    setCategories(value);
    // console.log(categories);
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 3,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        remember: true,
      }}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Poll Name"
        name="Poll name"
        rules={[
          {
            required: true,
            message: "Please input poll name!",
          },
        ]}
      >
        <Input value={name} placeholder={"name"} onChange={e => setName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Poll Description"
        name="Poll description"
        rules={[
          {
            required: true,
            message: "Please input poll description!",
          },
        ]}
      >
        <Input
          placeholder={"description"}
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="Categories"
        name="Poll Categories"
        rules={[
          {
            required: true,
            message: "Please add poll categories!",
          },
        ]}
      >
        <Select mode="tags" style={{ width: "100%" }} placeholder="Tags Mode" onChange={handleChange}>
          {children}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="border border-indigo-500 text-indigo-500 rounded-md px-4 py-2 ml-8 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
          htmlType="submit"
          loading={load}
          onClick={async () => {
            try {
              setLoad(true);
              console.log(name, description, categories);
              await tx(writeContracts?.NestVotingToken?.createPoll(name, description, categories));
            } catch (error) {
              console.error(error);
            } finally {
              setLoad(false);
            }
          }}
          disabled={!name || !description || !categories?.length}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateForm;
