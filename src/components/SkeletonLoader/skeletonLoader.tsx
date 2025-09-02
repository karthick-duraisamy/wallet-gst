import React from 'react';
import { Col, Row, Skeleton, Table, Button, Space, Card } from "antd";
import '../../styles/skeletonLoader.scss'

const FilterSkeleton: React.FC = () => {
  return (
    <Row gutter={16} align="middle">
      {/* Status */}
      <Col span={4}>
        <Skeleton.Input active size="default" className='cls-filter-fields'/>
      </Col>

      {/* Type */}
      <Col span={4}>
        <Skeleton.Input active size="default" className='cls-filter-fields' />
      </Col>

      {/* Vendor type */}
      <Col span={4}>
        <Skeleton.Input active size="default" className='cls-filter-fields'/>
      </Col>

      {/* Start / End date */}
      <Col span={5}>
        <Skeleton.Input active size="default" className='cls-filter-fields' />
      </Col>

      {/* Buttons */}
      <Col span={7} className='cls-filter-btns'>
        <Skeleton.Button active size="default" className='cls-primaryBtn'/>
        <Skeleton.Button active size="default" className='cls-secBtn'/>
      </Col>
    </Row>
  );
};

const TableSkeleton: React.FC = () => {
  // mimic same columns but replace data with skeletons
  const skeletonColumns = [
    { title: <Skeleton.Input className="cls-skeleton-input" active size="small" />, dataIndex: "col1" },
    { title: <Skeleton.Input className="cls-skeleton-input" active size="small" />, dataIndex: "col2" },
    { title: <Skeleton.Input className="cls-skeleton-input" active size="small" />, dataIndex: "col3" },
    { title: <Skeleton.Input className="cls-skeleton-inputL" active size="small" />, dataIndex: "col4" },
    { title: <Skeleton.Input className="cls-skeleton-inputS" active size="small" />, dataIndex: "col5" },
  ];

  // fake rows with skeleton cells
  const skeletonData = Array.from({ length: 6 }).map((_, i) => ({
    key: i,
    col1: <Skeleton.Input className="cls-skeleton-inputS" active size="small" />,
    col2: <Skeleton.Input className="cls-skeleton-inputS" active size="small" />,
    col3: <Skeleton.Input className="cls-skeleton-inputS" active size="small" />,
    col4: <Skeleton.Input className="cls-skeleton-input" active size="small" />,
    col5: <Skeleton.Input className="cls-skeleton-inputES" active size="small" />,
  }));

  return (
    <Table
      columns={skeletonColumns}
      dataSource={skeletonData}
      pagination={false}
      size="middle"
      bordered={false}
      scroll={{ x: 1200 }}
      tableLayout="fixed"
    />
  );
};

const PaginationSkeleton: React.FC = () => {
  return (
    <div className='cls-pagination-skeleton'>
      {/* Left side - Displaying info */}
      <Space>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton.Input
            key={i}
            style={{ width: 100, height: 20 }}
            active
            size="small"
          />
        ))}
      </Space>

      {/* Center - Page numbers */}
      <Space>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton.Avatar
            key={i}
            active
            shape="circle"
            className="mr-2 cls-page-skeleton"
          />
        ))}
      </Space>

      {/* Right side - Go to Page */}
      <Space>
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton.Input
            key={i}
            style={{ width: 100, height: 20 }}
            active
            size="small"
          />
        ))}
      </Space>
    </div>
  );
};


export {
  FilterSkeleton, TableSkeleton, PaginationSkeleton
} 