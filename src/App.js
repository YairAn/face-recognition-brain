import React from 'react';
import './App.css';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import  Navigation  from './components/Navigation/Navigation.js';
import Rank from './components/Rank/Rank';


/*key:  905373a88e3c423694d816565b91dcdf */
class App extends React.Component {
   constructor(){
     super();
     this.state = {
       input: '',
       imageUrl: '',
     }
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
    fetch("https://api.clarifai.com/v2/models/a403429f2ddf4b49b307e318f00e528b/versions/34ce21a40cc24b6b96ffee54aabff139/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result, null, 2).outputs[0].data))
      .catch(error => console.log('error', error));
  }

  render(){
  return (
    <div className="App">
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
     <FaceRecognition imageUrl={this.state.input}/>
    </div>
  );}
}

export default App;
