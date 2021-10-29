import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Home from './Views/Home/Home';

function App() {
  return (
    <>
      <div style={{ minHeight: '90vh' }}>
        <Header />
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
