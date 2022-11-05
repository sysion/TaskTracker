import Header from './components/Header';
import AppContent from './components/AppContent';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AppContent />
      <Tasks />
      <Footer />
    </div>
  );
}

export default App;
