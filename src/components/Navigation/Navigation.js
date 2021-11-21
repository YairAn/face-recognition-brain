import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if(isSignedIn){
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={ () => onRouteChange('signout') } className='ma3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'>Sign Out</p>
            </nav>
        );
    } else {
        return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={ () => onRouteChange('signin') } className='ma3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'>Sign In</p>
            <p onClick={ () => onRouteChange('register') } className='ma3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'>Register</p>
        </nav>
        );
    }
}

export default Navigation;