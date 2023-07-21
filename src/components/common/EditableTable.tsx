import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import DeleteIcon from 'icons/DeleteIcon';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
}

const EditableRow: React.FC = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="flex items-center justify-center"
        onClick={toggleEdit}
        onKeyDown={toggleEdit}
        role="presentation"
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  month: string;
  price: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type EditableTablePropsType = {
  source: DataType[];
  head: {
    title: string;
    width?: string;
    align?: string;
    editable?: boolean;
    dataIndex: string;
  }[];
  handleAdd: () => void;
  newData: DataType;
};

const EditableTable: React.FC<EditableTablePropsType> = ({
  source,
  head,
  handleAdd,
  newData,
}) => {
  console.log('source: ', source);
  const [dataSource, setDataSource] = useState<DataType[]>(source);

  console.log('dataSource', dataSource);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    ...head,
    {
      title: '삭제',
      dataIndex: 'operation',
      width: '10%',
      align: 'center',
      editable: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <div className="w-6 h-6 mx-auto text-red">
              <DeleteIcon />
            </div>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAddSource = () => {
    handleAdd();
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <button
        className="box-border flex items-center justify-center h-8 px-4 py-1 mb-4 text-sm rounded shadow w-28 bg-mainPurple text-lightGray active:font-bold hover:cursor-pointer"
        onClick={handleAddSource}
      >
        표 추가하기
      </button>
      <Table
        components={components}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default EditableTable;
