import { scroller } from 'react-scroll';
import { useNavigate, useLocation } from "react-router-dom";

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

    return (
        <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-6">
                {/* Logo ve İçerik Kısmı */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo ve Slogan */}
                    <div className="col-span-1 md:col-span-2 mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                                VoFAS
                            </h2>
                            <div className="h-8 w-px bg-purple-300 mx-4"></div>
                            <p className="text-purple-200 font-light italic">
                                Müşteri sesini anlamanın en doğal yolu
                            </p>
                        </div>
                        <p className="text-gray-300 text-sm mt-4 max-w-md">
                            VoFAS'la, gelişmiş yapay zeka destekli ses analiziyle müşteri deneyiminizi derinlemesine anlayıp işletmenizi fark yaratacak seviyeye taşıyoruz.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <span className="sr-only">LinkedIn</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Bağlantılar */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-purple-100">Hızlı Bağlantılar</h3>
                        <ul className="space-y-3">
                            <li>
                                <button
                                    onClick={() => handleScrollTo("home")}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                                >
                                    <span className="mr-2">→</span>Ana Sayfa
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollTo("about")}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                                >
                                    <span className="mr-2">→</span>Hakkımızda
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollTo("contact")}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                                >
                                    <span className="mr-2">→</span>Hizmetlerimiz
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollTo("faq")}
                                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all flex items-center"
                                >
                                    <span className="mr-2">→</span>Sıkça Sorulan Sorular
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* İletişim */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-purple-100">İletişim</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <svg className="h-5 w-5 mr-3 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:destek@vofas.com" className="text-gray-300 hover:text-white transition-colors">
                                    destek@vofas.com
                                </a>
                            </li>
                            <li className="flex items-start">
                                <svg className="h-5 w-5 mr-3 text-purple-300 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <p className="text-gray-300">Ankara Üniversitesi</p>
                                    <p className="text-gray-400 text-sm">Yazılım Mühendisliği</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Alt Bilgi ve Yasal Kısım */}
                <div className="pt-8 mt-8 border-t border-gray-400 md:flex md:items-center md:justify-between">
                    <div className="text-sm text-gray-400">
                        © 2025 VoFAS. Tüm hakları saklıdır.
                    </div>
                    <div className="mt-4 md:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <button
                                    onClick={() => handleScrollTo("privacy")}
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    Gizlilik Politikası
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollTo("legal")}
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    Kullanım Şartları
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScrollTo("cookies")}
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    Çerez Politikası
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;