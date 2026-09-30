import '../styling/footer.css';

export default function Footer() {

    const footerContent = <div className="footer-content">© 2024 MagicMarket</div>;

    return (
        <footer className="footer">
            {footerContent}
        </footer>
    )
}