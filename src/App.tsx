import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { ProductsPage } from './components/ProductsPage';

function App() {
    return (
        <div className="App">
            <Header />
            <ProductsPage />
            <Footer />
        </div>
    );
}

export default App
