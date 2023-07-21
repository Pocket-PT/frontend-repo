/* eslint-disable @typescript-eslint/no-unused-vars */
import Layout from 'components/Layout';
import EditableTable from 'components/common/EditableTable';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from 'constants/global';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import useMyProfileStore from 'stores/myProfile';

interface ColumnTypes {
  title: string;
  width?: string;
  align?: string;
  editable?: boolean;
  dataIndex: string;
}
[];

const PricePage = () => {
  const { priceTable, addPriceTable } = useMyProfileStore();
  const [count, setCount] = useState(2000);

  const head: ColumnTypes[] = [
    {
      title: '개월',
      dataIndex: 'month',
      width: '30%',
      align: 'center',
      editable: true,
    },
    {
      title: '금액',
      dataIndex: 'price',
      width: '30%',
      align: 'center',
      editable: true,
    },
  ];

  const newData = {
    key: count,
    price: `60000`,
    month: '5',
  };

  const handleAdd = () => {
    setCount(count + 1);
    addPriceTable(newData.month, newData.price);
  };

  return (
    <Layout title="Price">
      <div className="flex items-center justify-center w-full h-24 text-xl font-bold text-center text bg-gray text-mainPurple mb-11">
        배경 대충 멋진이미지
      </div>
      <div className="px-6">
        <EditableTable
          source={priceTable}
          head={head}
          handleAdd={handleAdd}
          newData={newData}
        />
      </div>
    </Layout>
  );
};

export default PricePage;
