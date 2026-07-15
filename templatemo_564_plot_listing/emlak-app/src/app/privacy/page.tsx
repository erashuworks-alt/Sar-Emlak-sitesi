export default function PrivacyPage() {
  const sections = [
    { title: "1. Toplanan Veriler", content: "Platform üzerinden oluşturduğunuz hesap bilgileri (ad, e-posta, telefon), ilan verileri ve iletişim bilgileri sistemlerimizde güvenli biçimde saklanır." },
    { title: "2. Verilerin Kullanımı", content: "Toplanan veriler yalnızca hizmetin sunulması, iyileştirilmesi ve size özgü deneyim oluşturulması amacıyla kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz." },
    { title: "3. Veri Güvenliği", content: "Supabase altyapısı ve PostgreSQL Row Level Security (RLS) politikaları ile verileriniz şifrelenerek saklanır. Yetkisiz erişimlere karşı 7/24 koruma altındadır." },
    { title: "4. Çerezler (Cookies)", content: "Platformumuz oturum yönetimi ve kullanıcı tercihlerini kaydetmek amacıyla birinci taraf çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz." },
    { title: "5. KVKK Hakları", content: "6698 Sayılı Kişisel Verilerin Korunması Kanunu kapsamında verilerinize erişme, düzeltme, silme veya işlenmesini kısıtlama hakkına sahipsiniz." },
    { title: "6. İletişim", content: "Gizlilik politikamız hakkındaki sorularınız için kvkk@emlakplatform.com adresine e-posta gönderebilirsiniz." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Gizlilik Politikası</h1>
          <p className="text-slate-500 dark:text-slate-400">Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 md:p-12 shadow-sm space-y-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Emlak Platform olarak kişisel verilerinizin gizliliğini ve güvenliğini birinci önceliğimiz olarak kabul ediyoruz. Bu politika, hangi verileri topladığımızı ve nasıl kullandığımızı açıklamaktadır.</p>
          {sections.map((s, i) => (
            <div key={i} className="border-t border-slate-100 dark:border-slate-700 pt-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{s.title}</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
