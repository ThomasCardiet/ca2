//component to edit a identity entry

import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

class IdentityEdit extends React.Component{
    constructor(props){
        super(props);
        /*To get url id param*/
        this.id = window.location.href.split('=')[1]
        this.state = {
            identity: {},
            isLoaded: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /*ajax request to recup (with get) list of identities*/
    componentDidMount(){

        axios.get(`/identity/${this.id}`)
            .then((response) => {
                console.log(response.data)
                // handle success when status is 200 and OK
                // populate the identities array with the data from the server
                // set isLoaded to true to make sure we render the right values on screen
                this.setState( {
                    identity: response.data,
                    isLoaded: true
                })

            })
            .catch((error)=> {
                // handle error
                // in case we get an error from the server, e.g. the server is offline
                this.setState({
                    isLoaded:false,
                    error
                })

            })
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
        axios.put(`/identity/${this.id}`, params )
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
        //assign variables using the state
        const { isLoaded, error, identity} = this.state;

        //conditional rendering: https://reactjs.org/docs/conditional-rendering.html
        //if we are waiting for our server to serve us the data render this part of code
        // also render this if the SERVER is offline
        if(!isLoaded){
            return(
                <div>The page is loading or the SERVER is down...</div>
            )
            //render this part of code if we received the data from the server
        } else {
            return (
                <section id="center-form">
                    <h2 id="form-title">Update of Identity</h2>
                    {/*Call function when form is submit*/}
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                            <input name="name" type="text" value={identity.name} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Surname:
                            <input name="surname" type="text" value={identity.surname} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Age:
                            <input name="age" type="number" value={identity.age} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Height:
                            <input name="height" type="number" step="0.1" value={identity.height} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <label>
                            Origins:
                            <textarea name="origins" defaultValue={identity.origins} onChange={this.handleChange} placeholder="type origins separate with ','"/>
                        </label>
                        <br/>
                        <label>
                            isAuth:
                            <input name="isAuth" type="text" value={identity.isAuth} onChange={this.handleChange} placeholder="true or false"/>
                        </label>
                        <br/>
                        <input className="button"  type="submit" value="Send" />
                    </form>
                    {/*link to identities route*/}
                    <Link className="link" to={"/"}>List of Identities</Link>
                </section>
            )
        }
    }
}

export default IdentityEdit;
