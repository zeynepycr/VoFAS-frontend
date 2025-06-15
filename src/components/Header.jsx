import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScrollTo = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                scroller.scrollTo(sectionId, {
                    duration: 500,
                    smooth: true,
                    offset: -70, // sabit header varsa
                });
            }, 100); // DOM yüklenmesini beklemek için küçük bir gecikme
        } else {
            scroller.scrollTo(sectionId, {
                duration: 500,
                smooth: true,
                offset: -70,
            });
        }
        setIsMenuOpen(false); // mobil menüyü kapat
    };

    const scrollLinkClass = "text-gray-500 hover:text-purple-400 cursor-pointer";

    return (
        <header className="py-4 bg-white fixed top-0 left-0 w-full z-50 shadow">
            <div className="container mx-auto px-4">
                <nav className="hidden md:flex items-center justify-between w-full">
                    <div className="mr-6">
                        <Link to="/" className="text-blue-700 font-bold text-3xl">VoFAS</Link>
                    </div>
                    <div className="flex space-x-4 justify-center flex-1">
                        <span className={scrollLinkClass} onClick={() => handleScrollTo("home")}>Ana Sayfa</span>
                        <span className={scrollLinkClass} onClick={() => handleScrollTo("about")}>Hakkımızda</span>
                        <span className={scrollLinkClass} onClick={() => handleScrollTo("privacy")}>Gizlilik</span>
                        <span className={scrollLinkClass} onClick={() => handleScrollTo("legal")}>Yasal</span>
                        <span className={scrollLinkClass} onClick={() => handleScrollTo("contact")}>İletişim</span>
                    </div>
                    <div className="ml-auto">
                        <Link to="/login" className="text-purple-900 hover:text-purple-400 font-medium">Giriş Yap</Link>
                    </div>
                </nav>
                <div className="md:hidden">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="text-blue-700 font-bold text-xl">VoFAS</Link>
                        <button
                            onClick={toggleMenu}
                            className="border border-gray-20 p-2"
                            aria-label="Ana menüyü aç"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-menu">
                                    <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {isMenuOpen && (
                        <nav className="mt-2 space-y-1">
                            <span onClick={() => handleScrollTo("home")} className="block py-1 text-black hover:text-gray-500 cursor-pointer">Ana Sayfa</span>
                            <span onClick={() => handleScrollTo("about")} className="block py-1 text-black hover:text-gray-500 cursor-pointer">Hakkımızda</span>
                            <span onClick={() => handleScrollTo("contact")} className="block py-1 text-black hover:text-gray-500 cursor-pointer">İletişim</span>
                            <Link to="/dashboard" className="block py-1 text-black hover:text-gray-500">Panel</Link>
                            <span onClick={() => handleScrollTo("legal")} className="block py-1 text-black hover:text-gray-500 cursor-pointer">Yasal</span>
                            <span onClick={() => handleScrollTo("privacy")} className="block py-1 text-black hover:text-gray-500 cursor-pointer">Gizlilik</span>
                            <Link to="/login" className="block py-1 text-black hover:text-gray-500 font-bold">Giriş Yap</Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
