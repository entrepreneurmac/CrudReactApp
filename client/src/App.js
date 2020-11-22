import React, {Component} from 'react';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader, Table} from 'reactstrap';
import {AvInput, AvForm} from 'availity-reactstrap-validation';
import './App.css'
import {PATH_PREFIX} from "./utils";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {AiOutlineFieldNumber, MdGroupAdd, RiUserSettingsLine} from "react-icons/all";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            data: [],
            filteredData: [],
            modalVisible: false,
            currentItem: ''
        }
    }

    componentDidMount() {
        this.query();
    }

    query = () => {
        axios({
            url: 'http://localhost:8/api/user/',
            method: 'get'
        }).then((res) => {
            this.setState({
                data: res.data
            })
        })
    };

    openModal = () => {
        this.setState({
            modalVisible: true
        })
    };
    closeModal = () => {
        this.setState({
            modalVisible: false,
            currentItem: ''
        })
    };


    handleSubmit = (event, errors, values) => {

        if (this.state.currentItem) {
            axios({
                url: PATH_PREFIX + '/api/user/' + this.state.currentItem.id,
                method: 'put',
                data: values
            }).then((res) => {
                this.notifyEdit();
                this.closeModal();
                this.query();
            })
        } else {
            axios({
                url: PATH_PREFIX + '/api/user/',
                method: 'post',
                data: values
            }).then((res) => {
                this.notifySave();
                this.closeModal();
                this.query();
            })
        }

    };

    remove = (id) => {
        axios({
            url: 'http://localhost:8/api/user/' + id,
            method: 'delete'
        }).then((res) => {
            this.query();
            this.notifyDelete();
        })
    };

    handleEdit = (item) => {
        this.openModal();
        this.setState({
            currentItem: item
        })
    };


    handleSearch = (event) => {
        axios({
            url: 'http://localhost:8/api/user/search',
            method: 'get',
            params: {
                name: event.target.value,
                surname: event.target.value,
                number: event.target.value
            }
        }).then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    notifyDelete = () => toast.error(" User deleted !!!");
    notifySave = () => toast.success(" User saved !!!");
    notifyEdit = () => toast.success(" User information edited !!!");

    render() {
        const {data, modalVisible, currentItem} = this.state;
        return (
            <div className="bgAll ">

                <h1 className="text-center p-4 bg-light text-muted header">Foydalanuvchilar ro'yhati</h1>
                <ToastContainer />
                <Modal isOpen={modalVisible}>
                    <ModalHeader className="bg-light text-muted">
                        <h2>Add user</h2>
                    </ModalHeader>
                    <ModalBody className="bg-light">
                        <AvForm id={'myForm'} onSubmit={this.handleSubmit} >
                            <AvInput className="mb-2" defaultValue={currentItem && currentItem.firstName} type='text' name={'firstName'}
                                     placeholder={'Firstname'}/>
                            <AvInput className="mb-2" defaultValue={currentItem && currentItem.lastName} type='text' name={'lastName'}
                                     placeholder={'Lastname'}/>
                            <AvInput className="mb-2" defaultValue={currentItem && currentItem.birthDate} type='date' name={'birthDate'}
                                     placeholder={'Birthdate'}/>
                            <AvInput className="mb-2" defaultValue={currentItem && currentItem.phoneNumber} type='text'
                                     name={'phoneNumber'} placeholder={'Phone number'}/>
                            <AvInput className="mb-2" defaultValue={currentItem && currentItem.experience} type='text'
                                     name={'experience'} placeholder={'Job experience'}/>
                            <AvInput defaultValue={currentItem && currentItem.balance} type='text' name={'balance'}
                                     placeholder={'Balance'}/>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter className="bg-light">
                        <button className="btn save btn-success" form={'myForm'} type={'submit'}><h3>Save</h3></button>
                        <button className="btn  btn-danger" onClick={this.closeModal}><h3>Close</h3></button>
                    </ModalFooter>
                </Modal>

                <div className="container-fluid mt-4">
                    <div className="row">
                        <div className="col-md-3 offset-1">
                            <div className="form">
                                <input type="search" name="search" autoComplete="off" required
                                       onChange={this.handleSearch}/>
                                <label className="label-name">
                                    <span className="content-name">Search</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-2 offset-6 my-3">
                            <button type='button' className='btn addButton' onClick={this.openModal}>Add user <MdGroupAdd/></button>
                        </div>

                    </div>
                    <div className="row mt-4">
                        <div className="col-md-8 text-center offset-2  ">
                            <Table>
                                <thead className="bgThead">
                                <tr className='text-white'>
                                    <th><AiOutlineFieldNumber style={{fontSize:25}}/></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Phone Number</th>
                                    <th>Birthdate</th>
                                    <th>Experience</th>
                                    <th>Balance</th>
                                    <th><RiUserSettingsLine style={{fontSize:25}}/></th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item, index) =>
                                    <tr key={index} className="bgBody">
                                        <td>{index + 1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{item.experience}</td>
                                        <td>{item.balance}</td>
                                        <td>
                                            <div className="row bgOpt">
                                                <button onClick={() => this.handleEdit(item)} className="btn btn-primary">Edit</button>
                                                <button onClick={() => this.remove(item.id)} className="btn btn-danger ml-2">Delete</button>

                                            </div>

                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;