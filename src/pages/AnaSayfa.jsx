import React from 'react';
import kiosk_adam from '../images/kiosk_adam.png';
import { Mic, Brain, BarChart2, UserMinus, Settings, Monitor } from "lucide-react";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx";



const AnaSayfa = () => {
    return (
        <section id="home" className="bg-gradient-to-r from-blue-800 to-purple-700">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between pt-16">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 pt-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mb-6">
                        Müşteri geri bildiriminin en doğal hali: <span className="text-blue-100">ses</span>.
                    </h1>
                    <p className="text-blue-100 text-lg mb-8">
                        VoFAS ile müşterilerinizin sesini <strong className="text-blue-50">gerçekten duyun</strong>!
                        <br/>
                        Anonim, kolay ve etkili bir geri bildirim süreciyle müşterilerinizi dinleyin, işletmenizi
                        geliştirin.
                    </p>
                    <a href="#contact">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 mb-10">
                            Demo İsteyin
                        </button>
                    </a>
                </div>
                <div className="md:w-1/2 flex justify-center md:justify-end self-center py-4 md:py-8">
                    <img src={kiosk_adam} alt="VoFAS men" className="w-full max-w-md"/>
                </div>
            </div>
            <section id="about" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-blue-700 text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">VoFAS’ın
                        Temel Özellikleri</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-colors-purple-20 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <Mic className="text-colors-purple-50 w-6 h-6"/>
                            </div>
                            <h3 className="text-colors-purple-50 text-xl font-semibold text-primary mb-2">Sesli Geri
                                Bildirim Alma</h3>
                            <p className="text-colors-gray-50">Kiosklar aracılığıyla müşteriler sesli olarak kolayca
                                geri
                                bildirim verebilir.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-colors-primary-10 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <Brain className="text-colors-primary-40 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-colors-primary-40 mb-2">Türkçe Doğal Dil
                                İşleme</h3>
                            <p className="text-colors-gray-50">Geri bildirimler Türkçe NLP modelleriyle analiz
                                edilir.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-colors-purple-20 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <BarChart2 className="text-colors-purple-50 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-colors-purple-50 mb-2">Anlamlı Raporlama ve İçgörü
                                Üretimi</h3>
                            <p className="text-colors-gray-50">Geri bildirimler temalara, duygulara ve önceliklere göre
                                sınıflandırılır.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-colors-primary-10 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <UserMinus className="text-colors-primary-40 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-colors-primary-40 mb-2">Anonimlik ve Kolaylık</h3>
                            <p className="text-colors-gray-50">Müşteriler herhangi bir kişisel bilgi vermeden hızlıca
                                geri
                                bildirimde bulunabilir.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <Settings className="text-purple-600 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-purple-600 mb-2">Entegrasyon ve
                                Özelleştirme</h3>
                            <p className="text-gray-600">İşletmelere özel analiz panelleri ve özelleştirilebilir
                                geri
                                bildirim akışları.</p>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-md">
                            <div
                                className="bg-colors-primary-10 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <Monitor className="text-colors-primary-40 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-colors-primary-40 mb-2">Kullanıcı Dostu
                                Arayüz</h3>
                            <p className="text-colors-gray-50">Modern ve sezgisel tasarımıyla herkes kolayca
                                kullanabilir.</p>
                        </div>
                    </div>
                </div>
            </section>
            <PrivacyPolicy/>
            <div id="contact" className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4"
                 style={{backgroundImage: `url('src/images/Background.jpg')`}}>
                <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl max-w-6xl w-full p-6 sm:p-10 md:p-14 lg:p-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-950">Bizimle İletişime
                                Geçin</h2>
                            <p className="text-gray-700 mb-6">
                                Formu doldurarak bize ulaşabilirsiniz. En kısa sürede geri dönüş sağlarız.
                            </p>
                            <div className="space-y-2 text-gray-700">
                                <p><strong>Email:</strong> info@vofas.com</p>
                                <p><strong>Telefon:</strong> +90 536 071 8864</p>
                                <p><strong>Adres:</strong> Ankara, Türkiye</p>
                            </div>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block font-semibold mb-1">Adınız</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Adınızı girin"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Email adresiniz"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block font-semibold mb-1">Mesajınız</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Mesajınızı buraya yazın"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnaSayfa;
