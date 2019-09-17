import React from 'react';
import axios from 'axios';
import './Account.css'
import { Table, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import {API_URL} from "../../App";

export class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            source: []
        };
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(e) {
        const val = e.target.value;
        const source = [];
        this.state.source.forEach(i => source.push(i));
        const result = source.filter(it => it.name.startsWith(val)
            || it.fullName.startsWith(val)
            || it.login.startsWith(val));
        this.setState({items: !!val ? result : source})
    }

    componentDidMount() {
        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        axios.get(`${API_URL}/accounts/find/all`)
            .then(items => {
                this.setState({
                    isLoaded: true,
                    items: items.data,
                    source: items.data,
                })
            }, error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        const {error, isLoaded, items} = this.state;
        const list = items.map((it, k) => <tr key={k}>
            <td>{it.name}</td>
            <td>{it.fullName}</td>
            <td>{it.login}</td>
            <td>{it.email}</td>
        </tr>);
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return <div className="col-6 offset-3">
                <h1>Account list</h1>
                <div className="d-inline-flex flex-row align-content-between w-100 mb-3">
                    <Button color="primary" className="" href="save/account">Create</Button>
                    <InputGroup className="ml-1">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <Input placeholder="search..." onChange={this.onSearch}/>
                    </InputGroup>
                </div>
                <Table className="App-w-100">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Full name</th>
                        <th>Login</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </Table>
            </div>;
        }
    }
}