import React, { useState } from "react";
import { Layout, Menu, Card, Button, Upload, message } from "antd";
import {
  AppstoreAddOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const { Header, Content, Sider } = Layout;

const ItemTypes = {
  FURNITURE: "furniture",
};

const initialItems = [
  { id: 1, name: "Table", src: "/table.jpg", x: 50, y: 50 },
  {
    id: 2,
    name: "Chair",
    src: "/chair.jpg",
    x: 150,
    y: 100,
  },
];

const Planner = () => {
  const [items, setItems] = useState(initialItems);

  const saveToFile = () => {
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "layout.json";
    link.click();
  };

  const loadFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedItems = JSON.parse(e.target.value);
        setItems(importedItems);
        message.success("Arranged successfully!");
      } catch (error) {
        message.error("Error occured when loading the file");
      }
    };
    reader.readAsText(file);
  };

  const Furniture = ({ id, src, x, y }) => {
    const [, drag] = useDrag(() => ({
      type: ItemTypes.FURNITURE,
      item: () => ({ id }),
    }));

    return (
      <img
        ref={drag}
        src={src}
        alt={`Furniture-${id}`}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: "50px",
          height: "50px",
          cursor: "move",
        }}
      />
    );
  };

  const Map = () => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.FURNITURE,
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const draggedItem = items.find((i) => i.id === item.id);
        if (draggedItem && delta) {
          setItems((prevItems) =>
            prevItems.map((i) =>
              i.id === draggedItem.id
                ? {
                    ...i,
                    x: draggedItem.x + delta.x,
                    y: draggedItem.y + delta.y,
                  }
                : i
            )
          );
        }
      },
    }));

    return (
      <div
        ref={drop}
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#d3d3d3",
          position: "relative",
        }}
      >
        {items.map((item) => (
          <Furniture key={item.id} {...item} />
        ))}
      </div>
    );
  };
  const addItemToMap = (item) => {
    // Generating random positions on the map
    const randomX = Math.floor(Math.random() * 400);
    const randomY = Math.floor(Math.random() * 400);

    setItems((prevItems) => [
      ...prevItems,
      { ...item, id: prevItems.length + 1, x: randomX, y: randomY },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header">
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
              Furniture planner
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={300}
            className="site-layout-background"
            style={{ padding: "20px" }}
          >
            <Card title="Furniture" style={{ marginTop: 20, width: "100%" }}>
              {initialItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    style={{
                      width: "40px",
                      height: "40px",
                      marginRight: "10px",
                    }}
                  />
                  <span>{item.name}</span>
                  <Button
                    type="primary"
                    size="small"
                    style={{ marginLeft: "auto" }}
                    onClick={() => addItemToMap(item)}
                  >
                    Add to map
                  </Button>
                </div>
              ))}
            </Card>

            <div style={{ marginBottom: "20px" }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                style={{ width: "100%" }}
                onClick={saveToFile}
              >
                Save into file
              </Button>
            </div>

            <div
              style={{ display: "block", marginBottom: "20px", width: "100%" }}
            >
              <Upload
                accept=".json"
                showUploadList={false}
                beforeUpload={(file) => {
                  loadFromFile(file);
                  return false;
                }}
              >
                <Button
                  style={{
                    width: "100%",
                    minWidth: "260px",
                    textAlign: "center",
                  }}
                  type="default"
                  icon={<UploadOutlined />}
                  sy
                >
                  Upload
                </Button>
              </Upload>
            </div>

            <div>
              <Button
                type="danger"
                style={{ width: "100%" }}
                onClick={() => setItems([])}
              >
                Clear Map
              </Button>
            </div>
          </Sider>
          <Content
            style={{
              padding: "24px",
              minHeight: "100%",
              backgroundColor: "#f0f2f5",
            }}
          >
            <Map />
          </Content>
        </Layout>
      </Layout>
    </DndProvider>
  );
};

export default Planner;
