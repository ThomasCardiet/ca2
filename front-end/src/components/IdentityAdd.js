// component to add a identity
import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class IdentityAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            identity: {
                name: '',
                surname: '',
                age: 0,
                height: 0.0,
                origins: 0,
                isAuth: false
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*Function called when any input of form is change (with option onChange)*/
    handleChange(event) {
        let object = this.state.identity;
        /*Update of input value with name*/
        object[event.target.name] = event.target.value;
        /*Update of state*/
        this.setState({
            identity: object,
            isLoaded: true
        });
    }

    /*Function called when form is submit*/
    handleSubmit(event) {
        event.preventDefault()
        {/*Construct Url Search Params to send to API*/}
        const params = new URLSearchParams()
        params.append('name', this.state.identity.name)
        params.append('surname', this.state.identity.surname)
        params.append('age', this.state.identity.age)
        params.append('height', this.state.identity.height)
        params.append('origins', this.state.identity.origins)
        params.append('isAuth', this.state.identity.isAuth)
        axios.post(`/identity`, params )
            .then((response) => {
                /*If success redirection to List of identities*/
                window.location.href=('/');

            })
            .catch((error)=> {
                /*If error send to console*/
                console.log(error)

            })
    }

    render(){
        return (
            <section id="center-form">
                <h2 id="form-title">Creation of Identity</h2>
                {/*Call function when form is submit*/}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name*
                        <input name="name" type="text" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Surname*
                        <input name="surname" type="text" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Age*
                        <input name="age" type="number" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Height*
                        <input name="height" type="number" step="0.1" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <label>
                        Origins*
                        <textarea name="origins" onChange={this.handleChange} placeholder="type origins separate with ','"/>
                    </label>
                    <br/>
                    <label>
                        isAuth*
                        <input name="isAuth" type="text" onChange={this.handleChange} placeholder="true or false"/>
                    </label>
                    <br/>
                    <input className="button" type="submit" value="Send" />
                </form>
                {/*link to identities route*/}
                <Link className="link" to={"/"}>List of Identities</Link>
            </section>
        )
    }
}

export default IdentityAdd