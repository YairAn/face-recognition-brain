import React from 'react';
import { Helmet } from 'react-helmet'
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import  Navigation  from './components/Navigation/Navigation.js';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


/*key:  905373a88e3c423694d816565b91dcdf */
class App extends React.Component {
   constructor(){
     super();
     this.state = {
       input: '',
       imageUrl: '',
       box: {},
       route: 'signin',
       isSignedIn: false,

     }
   }

   calculateFaceLocation = (data) => {
    const clarifaiFace = data;
    console.log(data);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

   onInputChange = (event) => {
    this.setState({input: event.target.value}); 
  }
  
   onButtonSubmit = () => {
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "z5ds61cjwyo5",
        "app_id": "8be6ec20ea6e426d97a899d6517ae545"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 905373a88e3c423694d816565b91dcdf'
      },
      body: raw
    };
    let box_data = {};
    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/versions/34ce21a40cc24b6b96ffee54aabff139/outputs", requestOptions)
      .then(response => response.text())
      .then(result => {
        const box_data = JSON.parse(result, null, 2).outputs[0].data.regions[0].region_info.bounding_box;
        this.displayFaceBox(this.calculateFaceLocation(box_data))
      })
      .catch(error => console.log('error', error));
      
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
  return (
    <div className="App">
      <Helmet>
        <title>THE BRAIN</title>
      </Helmet>
     <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
     { this.state.route === 'home'
     ?<div>
       <Logo />
       <Rank />
       <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
       <FaceRecognition box={this.state.box} imageUrl={this.state.input}/>
     </div>
     : (
      this.state.route === 'signin'
      ? <SignIn onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange}/>
     )
    }
    </div>
  );}
}

export default App;
