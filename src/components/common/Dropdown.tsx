import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

type Props = {
  Icon?: JSX.Element;
  items: MenuProps['items'];
};

const DropdownButton: React.FC<Props> = ({ Icon, items }) => (
  <Dropdown menu={{ items }} trigger={['click']} className="w-6 h-6">
    <button>
      <Space>
        <div className="w-6 h-6">{Icon}</div>
      </Space>
    </button>
  </Dropdown>
);

export default DropdownButton;
