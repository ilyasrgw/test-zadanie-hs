import React, { useEffect, useState } from "react";
import { Table, Select, Input, AutoComplete, Spin } from "antd";
import productData from "assets/data/product-list.data.json";

const { Option } = Select;

const Products = () => {
  const [filteredData, setFilteredData] = useState([]); // Rendered data
  const [searchOptions, setSearchOptions] = useState([]); // Search options
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFilteredData(productData);
      } catch (error) {
        console.error("Error occured when loading data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update search options
  const handleSearchInputChange = (searchText) => {
    if (!searchText) {
      setSearchOptions([]);
      setFilteredData(productData);
      return;
    }

    // Filtering by name
    const matchingProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Filtering options with icons
    const options = matchingProducts.map((product) => ({
      value: product.name,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={product.image} // Making sure that productData has images property
            alt={product.name}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
              borderRadius: "4px",
            }}
          />
          <span>{product.name}</span>
        </div>
      ),
      product, // Saving the current object
    }));

    setSearchOptions(options);
    setFilteredData(matchingProducts); // Rendering matching products
  };

  // Product handler function
  const handleSearchSelect = (value, option) => {
    setFilteredData([option.product]); // Showing selected product
  };

  // Select category filtering
  const handleCategoryChange = (value) => {
    const filtered =
      value === "All"
        ? productData
        : productData.filter((item) => item.category === value);
    setFilteredData(filtered);
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt={text}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
              borderRadius: "4px",
            }}
          />
          {text}
        </div>
      ),
    },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    { title: "Stock", dataIndex: "stock", key: "stock" },
  ];

  // Filtering categories
  const categories = [
    "All",
    ...new Set(productData.map((item) => item.category)),
  ];

  return (
    <div style={{ padding: "20px" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <>
          {/* Filtering */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <AutoComplete
              style={{ width: "400px" }}
              options={searchOptions}
              onSearch={handleSearchInputChange}
              onSelect={handleSearchSelect}
              placeholder="Search for products"
            >
              <Input.Search allowClear enterButton />
            </AutoComplete>
            <Select
              style={{ width: "200px" }}
              defaultValue="All"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>

          {/* Table of products */}
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </>
      )}
    </div>
  );
};

export default Products;
