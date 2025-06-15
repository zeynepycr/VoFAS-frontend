import { useState } from "react";

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4 border-b border-colors-purple-10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left text-xl font-semibold text-colors-purple-10 py-2 flex justify-between items-center"
            >
                {title}
                <span className="text-lg">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
                <div className="pl-2 pr-1 text-neutral-50 text-sm md:text-base space-y-2 my-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function PrivacyPolicy() {
    return (
        <section id="privacy" className="bg-colors-primary-50 py-10 text-neutral-50 text-justify leading-loose">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-10">
                    Gizlilik Politikamız
                </h2>

                <p className="my-1.5">
                    VoFAS (Voice Feedback Analysing Systems) olarak, kullanıcılarımızın gizliliğini önemsiyor,
                    verilerin güvenliğini sağlamak ve yasal yükümlülüklerimizi yerine getirmek için gerekli tüm
                    önlemleri alıyoruz. Bu politika, VoFAS platformu üzerinden toplanan geri bildirim verilerinin
                    nasıl işlendiğini, kimlerle paylaşıldığını ve ne kadar süreyle saklandığını açıklamaktadır.
                </p>

                <AccordionItem title="1. Hangi Verileri Topluyoruz?">
                    <p>VoFAS aracılığıyla toplanan veriler, kullanıcıların doğrudan verdiği geri bildirimlerden oluşur. Bu veriler:</p>
                    <ul className="list-disc list-inside">
                        <li>Sesli ya da yazılı geri bildirim içerikleri,</li>
                        <li>Kullanım zamanı, kullanılan cihaz türü gibi teknik bilgiler,</li>
                        <li>(Varsa) kullanıcı tarafından açıkça paylaşılan ad, e-posta gibi iletişim bilgileri</li>
                    </ul>
                    <p>Kişisel bilgiler yalnızca <strong>kullanıcının kendi rızasıyla</strong> ve belirli bir amaç doğrultusunda toplanır.</p>
                </AccordionItem>

                <AccordionItem title="2. Verilerin Kullanım Amacı">
                    <p>Toplanan veriler aşağıdaki amaçlarla kullanılır:</p>
                    <ul className="list-disc list-inside">
                        <li>Kullanıcının ilettiği görüş, öneri veya şikayetlerin ilgili kuruma iletilmesi</li>
                        <li>Hizmet kalitesinin ölçülmesi ve iyileştirilmesi</li>
                        <li>Sistem performansının analiz edilmesi</li>
                        <li>İstatistiksel raporlamalar yapılması</li>
                    </ul>
                    <p>VoFAS, kullanıcıların geri bildirim içeriklerini <strong>ürünü satın alan kurumlarla</strong> paylaşır.
                        Bu paylaşım, yalnızca ilgili kurumun kendi müşterilerinden gelen verileri kapsar.</p>
                </AccordionItem>

                <AccordionItem title="3. Anonimlik ve Şeffaflık">
                    <p>VoFAS platformunda toplanan geri bildirimler, sistem tarafından <strong>anonimleştirilmeden</strong>, doğrudan ilgili kuruma iletilir.
                        Bu nedenle, kullanıcının geri bildirim sırasında kimliğini belirtmemesi durumunda anonimlik kendiliğinden korunur.</p>
                    <p>VoFAS, kullanıcıları bu durum hakkında işlem öncesinde <strong>açık şekilde bilgilendirir </strong>
                        ve veri paylaşımı için gerekli <strong>açık rızayı alır</strong>.</p>
                </AccordionItem>

                <AccordionItem title="4. Verilerin Saklanma Süresi">
                    <p>Veriler, <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong> ve ilgili mevzuat çerçevesinde,
                        yalnızca işlenme amacıyla orantılı süre boyunca saklanır. Bu süre sonunda veriler, güvenli şekilde:</p>
                    <ul className="list-disc list-inside">
                        <li>Silinir,</li>
                        <li>Yok edilir veya</li>
                        <li>Kimlikten arındırılarak istatistiksel amaçlarla kullanılabilir hale getirilir.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="5. Verilerin Güvenliği">
                    <p>VoFAS, kullanıcı verilerinin yetkisiz erişime, kayba veya kötüye kullanıma karşı korunması için
                        gerekli tüm teknik ve idari önlemleri alır. Veriler, güvenli sunucularda, erişim kontrolleri altında saklanır.</p>
                </AccordionItem>

                <AccordionItem title="6. Üçüncü Taraflarla Paylaşım">
                    <p>VoFAS, kullanıcıdan alınan geri bildirim verilerini yalnızca ilgili <strong>kurum ya da şirket ile</strong> paylaşır.
                        Bu paylaşım, kullanıcı tarafından verilen açık rıza çerçevesinde gerçekleşir.
                        VoFAS, verileri hiçbir şekilde üçüncü şahıslarla <strong>ticari amaçla paylaşmaz, satmaz ya da devretmez</strong>.</p>
                </AccordionItem>

                <AccordionItem title="7. Kullanıcı Hakları">
                    <p>KVKK kapsamında kullanıcılar:</p>
                    <ul className="list-disc list-inside">
                        <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
                        <li>Hangi verilerin işlendiğini öğrenme,</li>
                        <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme,</li>
                        <li>Verilerinin silinmesini veya yok edilmesini talep etme,</li>
                        <li>Bilgilerin aktarıldığı üçüncü kişileri öğrenme hakkına sahiptir.</li>
                    </ul>
                    <p>Bu haklarınızı kullanmak için bizimle <a href="mailto:destek@vofas.com" className="underline text-white">destek@vofas.com</a> adresinden iletişime geçebilirsiniz.</p>
                </AccordionItem>

                <p className="mt-6"><strong>Geri bildirim verirken, verilerinizin ilgili kuruma iletileceğini bildiğinizi ve bu paylaşımı onayladığınızı kabul etmiş olursunuz.</strong></p>
            </div>
        </section>
    );
}
