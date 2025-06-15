import { scroller } from 'react-scroll';
import { useNavigate } from "react-router-dom";


const Footer = () => {

    const navigate = useNavigate();

    const handleScrollTo = (sectionId) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                scroller.scrollTo(sectionId, {
                    duration: 500,
                    smooth: true,
                    offset: -70,
                });
            }, 100);
        } else {
            scroller.scrollTo(sectionId, {
                duration: 500,
                smooth: true,
                offset: -70,
            });
        }
    };

    const scrollLinkClass = "text-gray-500 hover:text-purple-400 cursor-pointer";

    return (
        <footer className="bg-colors-primary-10 text-colors-purple-50 border-t border-gray-20 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-xl font-bold text-primary mb-2">VoFAS</h2>
                    <p className="text-gray-30">Müşteri sesini anlamanın en doğal yolu.</p>
                </div>

                <div className="space-y-1">
                    <p className={scrollLinkClass} onClick={() => handleScrollTo("home")}>Ana Sayfa</p>
                    <p className={scrollLinkClass} onClick={() => handleScrollTo("about")}>Hakkımızda</p>
                    <p className={scrollLinkClass} onClick={() => handleScrollTo("privacy")}>Gizlilik</p>
                    <p className={scrollLinkClass} onClick={() => handleScrollTo("legal")}>Yasal</p>
                    <p className={scrollLinkClass} onClick={() => handleScrollTo("contact")}>İletişim</p>
                </div>

                <div className="space-y-2">
                    <p className="text-gray-30">📧 Email: <a href="mailto:destek@vofas.com"
                                                            className="hover:text-purple-30">destek@vofas.com</a></p>
                    <p className="text-gray-30">📍 Adres: Ankara Üniversitesi</p>
                    <p className="text-gray-30">Yazılım Mühendisliği</p>

                </div>
            </div>

            <div className="mt-4 text-left ml-10 text-sm text-gray-30">
                © 2025 VoFAS. Tüm hakları saklıdır.
            </div>
        </footer>
    );
};

export default Footer;
