import React from 'react';
import kiosk_adam from '../images/kiosk_adam.png';
import { Mic, Brain, BarChart2, UserMinus, Settings, Monitor } from "lucide-react";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx";



const AnaSayfa = () => {
    return (
        <section id="home" className="bg-gradient-to-r from-blue-700 to-purple-700">
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
                </div>
                <div className="md:w-1/2 flex justify-end self-start py-8 pt-16">
                    <img src={kiosk_adam} alt="VoFAS men" className="w-full max-w-md"/>
                </div>
            </div>
            <section id="about" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-blue-700 text-3xl md:text-4xl font-extrabold text-center text-primary mb-12">VoFAS’ın Temel  Özellikleri</h2>
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
                                className="bg-colors-purple-20 w-12 h-12 flex items-center justify-center rounded-2xl mx-auto mb-4">
                                <Settings className="text-colors-purple-50 w-6 h-6"/>
                            </div>
                            <h3 className="text-xl font-semibold text-colors-purple-50 mb-2">Entegrasyon ve
                                Özelleştirme</h3>
                            <p className="text-colors-gray-50">İşletmelere özel analiz panelleri ve özelleştirilebilir
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
            <PrivacyPolicy />
</section>
);
};

export default AnaSayfa;
