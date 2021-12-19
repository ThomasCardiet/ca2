// component to add a identity
import React from 'react';

class IdentityAdd extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // you should save the variables in this state
            // all variables that should be in your class should be here
        }
    }

    render(){
        return (
            <div>
                <form action="">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text"/>

                    <label htmlFor="surname">Surname</label>
                    <input id="surname" type="text"/>


                    <label htmlFor="age">Age</label>
                    <input id="age" type="number"/>

                    <label htmlFor="height">Height</label>
                    <input id="height" type="text"/>

                    <label htmlFor="origins">Origins</label>
                    <input id="origins" type="text"/>

                    <label htmlFor="isAuth">isAuth</label>
                    <input id="isAuth" type="checkbox"/>

                </form>
            </div>
        )
    }
}

export default IdentityAdd