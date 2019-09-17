import React from 'react';
import axios from 'axios';
import './SaveAccount.css'
import {InputGroup, Input, Button} from 'reactstrap'
import App, {API_URL} from "../../App";
import * as router from 'react-router-dom'

export class SaveAccount extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name: "", fullName: "", login: ""};

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeLogin = this.onChangeLogin.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeName(e) {
        var val = e.target.value;
        this.setState({name: val});
    }
    onChangeFullName(e) {
        var val = e.target.value;
        this.setState({fullName: val});
    }
    onChangeLogin(e) {
        var val = e.target.value;
        this.setState({login: val});
    }

    handleSubmit(e) {
        e.preventDefault();
        const BrowserRouter = router.BrowserRouter;
        axios.put(`${API_URL}/accounts/save`, this.state)
            .then(() => {
                this.props.history.goBack();
            }, error => {
                alert(error.message);
            });
    }
    render() {
        const Link = router.Link;
        return <div className="col-6 offset-3">
            <h1>Create Account</h1>
            <form onSubmit={this.handleSubmit} className="mt-5">
                <InputGroup className="m-1">
                    <Input placeholder="username" type="text" value={this.state.name} onChange={this.onChangeName}/>
                </InputGroup>
                <InputGroup className="m-1">
                    <Input placeholder="full name" type="text" value={this.state.fullName} onChange={this.onChangeFullName}/>
                </InputGroup>
                <InputGroup className="m-1">
                    <Input placeholder="login" type="text" value={this.state.login} onChange={this.onChangeLogin}/>
                </InputGroup>
                <Button className="m-1" color="success" type="submit">Save</Button>
                <Link to="/" className="m-1 btn btn-primary">Back</Link>
            </form>
        </div>;
    }
}