// component to view 1 single identity
import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

class IdentityView extends React.Component{
    constructor(props){
        super(props);
        this.id = window.location.href.split('=')[1]
        this.state = {
            identity: {},
            isLoaded: true
        }
    }

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

    deleteIdentity(id) {
        axios.delete(`/identity/${id}`)
        window.location.href=('/');
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
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Age</th>
                            <th>Origins</th>
                            <th>Height</th>
                            <th>isAuth</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr key={identity._id}>
                            <td>{identity._id}</td>
                            <td>{identity.name}</td>
                            <td>{identity.surname}</td>
                            <td>{identity.age}</td>
                            <td>{identity.origins}</td>
                            <td>{identity.height}</td>
                            <td >{identity.isAuth? 'Yes' : 'No'}</td>
                            {/* link to view and edit the identity details by ID */}
                            <td><Link to={`/editIdentity?id=${identity._id}`}>Edit</Link></td>
                            <td>
                                <button onClick={this.deleteIdentity.bind(this,identity._id)}>Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default IdentityView;