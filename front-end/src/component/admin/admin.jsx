import React, {useContext, useEffect, useRef, useState} from 'react';
import {Popconfirm, Table} from 'antd';
import {Button, Col, Drawer, Form, Input, Row, Select, Space} from 'antd';
import axios from 'axios';
import BackURL from '../../tools/backURL.js';
import frontURL from "../../tools/frontURL.js";
import loginCheck from "../../tools/loginCheck.js";
import logout from "../../tools/logout.js";

const {Option} = Select;

const EditableContext = React.createContext(null);
const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (<Form form={form} component={false}>
        <EditableContext.Provider value={form}>
            <tr {...props} />
        </EditableContext.Provider>
    </Form>);
};
const EditableCell = ({
                          title, editable, children, dataIndex, record, handleSave, ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record, ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (<Form.Item
            style={{
                margin: 0,
            }}
            name={dataIndex}
            rules={[{
                required: true, message: `${title} is required.`,
            },]}
        >
            <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        </Form.Item>) : (<div
            className="editable-cell-value-wrap"
            style={{
                paddingRight: 24,
            }}
            onClick={toggleEdit}
        >
            {children}
        </div>);
    }
    return <td {...restProps}>{childNode}</td>;
};
const App = () => {

    loginCheck();

    const [dataSource, setDataSource] = useState();
    const searchData = () => {
        fetch(BackURL + 'book.php?type=search', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setDataSource(data);
            })
            .catch(e => console.log('错误:', e));
    }
    // fetch data
    useEffect(() => {
        searchData();
    }, []);
    const handleDelete = (id) => {
        let url = BackURL + 'book.php?type=delete&id=' + id;
        fetch(url, {
            credentials: 'include'
        })
            .then((res) => {
                console.log(res);
                searchData();
            })
            .catch(e => console.log('错误:', e));
    };
    const handleAdd = () => {
        let bookName = document.getElementById("bookName");
        let author = document.getElementById("author");
        let xhrURL = document.getElementById("xhrURL");
        let imageURL = document.getElementById("imageURL");
        let lid = document.getElementById("lid");
        let requestData = {
            type: 'add',
            bookName: bookName.value,
            author: author.value,
            xhrURL: xhrURL.value,
            imageURL: imageURL.value,
            lid: lid.value
        };
        axios({
            method: 'POST',
            url: BackURL + 'book.php',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(requestData)
        })
            .then(() => {
                searchData();
            }, error => {
                console.log('错误', error.message)
            })
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item, ...row,
        });

        const requestData = {
            type: "update",
            id: row.id,
            bookName: row.bookName,
            author: row.author,
            xhrURL: row.xhrUrl,
            imageURL: row.imageUrl,
            lid: row.lid
        };
        axios({
            method: 'POST',
            url: BackURL + 'book.php',
            withCredentials: true,
            headers: {'content-type': 'application/json'},
            data: JSON.stringify(requestData)
        })
            .then(res => {
                console.log(res);
                setDataSource(newData);
            }, error => {
                console.log('错误', error.message)
            })
    };

    const defaultColumns = [{
        title: 'Book id', dataIndex: 'id',width: '5%',
    }, {
        title: 'Book Name', dataIndex: 'bookName', width: '15%', editable: true,
    }, {
        title: 'Author', dataIndex: 'author', width: '15%', editable: true,
    }, {
        title: 'Label', dataIndex: 'lid', width: '5%', editable: true,
    }, {
        title: 'Create Time', dataIndex: 'createTime', width: '15%',
    }, {
        title: 'Xhr Url', dataIndex: 'xhrUrl',editable: true,
        render:(content) => (
            <div style={{ width:200, wordBreak:"break-all" }}>{content}</div>
        )
    }, {
        title: 'Image Url', dataIndex: 'imageUrl', editable: true,
        render:(content) => (
            <div style={{ width:200, wordBreak:"break-all" }}>{content}</div>
        )
    }, {
        title: 'Option',
        dataIndex: 'operation',
        render: (_, record) => dataSource.length >= 1 ? (
            <Popconfirm title="Sure???" onConfirm={() => handleDelete(record.id)}>
                <a>Delete</a>
            </Popconfirm>) : null,
    },];

    const components = {
        body: {
            row: EditableRow, cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col, onCell: (record) => ({
                record, editable: col.editable, dataIndex: col.dataIndex, title: col.title, handleSave,
            }),
        };
    });
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Drawer
                title="Add a read book"
                width={420}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={<Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleAdd} type="primary">
                        Submit
                    </Button>
                </Space>}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={18}>
                            <Form.Item
                                name="book name"
                                label="bookName"
                            >
                                <Input id="bookName" placeholder=""/>
                            </Form.Item>
                            <Form.Item
                                name="author"
                                label="author"
                            >
                                <Input id="author" placeholder=""/>
                            </Form.Item>
                            <Form.Item
                                name="label"
                                label="label"
                            >
                                <Input id="lid" placeholder=""/>
                            </Form.Item>
                            <Form.Item
                                name="xhrURL"
                                label="xhrURL"
                            >
                                <Input id="xhrURL" placeholder=""/>
                            </Form.Item>
                            <Form.Item
                                name="imageURL"
                                label="imageURL"
                            >
                                <Input id="imageURL" placeholder=""/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
            <div className="dashboard">
                <div className="profile">
                    <h2 onClick={showDrawer}>xiaoharen's reading management</h2>
                </div>
                <button onClick={logout}>Log out</button>
                <hr/>
                <div className="schedule-table">
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
};
export default App;