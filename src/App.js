import './App.css';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import  Navigation  from './components/Navigation/Navigation.js';
import Rank from './components/Rank/Rank';

function App() {
  return (
    <div className="App">
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm />
     {/*<FaceRecognition /> */}
    </div>
  );
}

export default App;
