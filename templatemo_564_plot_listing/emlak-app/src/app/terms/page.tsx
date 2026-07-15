export default function TermsPage() {
  const sections = [
    { title: "1. Hizmet Kullanımı", content: "Emlak Platform hizmetlerini yalnızca yasal amaçlar için kullanabilirsiniz. Yanlış, yanıltıcı veya sahte ilan oluşturmak kesinlikle yasaktır." },
    { title: "2. Hesap Sorumluluğu", content: "Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi üçüncü şahıslarla paylaşmamanız ve hesabınızda gerçekleşen tüm faaliyetlerden sorumlu olduğunuzu kabul etmeniz gerekmektedir." },
    { title: "3. İlan Kuralları", content: "Yayınlanan ilanlar doğru, güncel ve gerçek bilgiler içermelidir. Yanıltıcı fiyat, sahte fotoğraf veya hatalı konum bilgisi içeren ilanlar sistemden kaldırılacaktır." },
    { title: "4. Fikri Mülkiyet", content: "Platform üzerindeki tüm içerik, tasarım ve yazılım Emlak Platform'a aittir ve telif hukuku kapsamında korunmaktadır. İzinsiz kopyalanması yasaktır." },
    { title: "5. Sorumluluğun Sınırlandırılması", content: "Emlak Platform, kullanıcılar arasındaki anlaşmazlıklardan, mülk değerinden veya üçüncü taraf içeriklerinden doğan zararlardan sorumlu tutulamaz." },
    { title: "6. Değişiklikler", content: "Bu koşullar zaman zaman güncellenebilir. Önemli değişiklikler e-posta veya platform bildirimi ile duyurulacaktır. Devam eden kullanım güncel koşulları kabul ettiğiniz anlamına gelir." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Kullanım Şartları</h1>
          <p className="text-slate-500 dark:text-slate-400">Son güncelleme: {new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 p-8 md:p-12 shadow-sm space-y-8">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Emlak Platform'u kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. Lütfen bu koşulları dikkatlice okuyunuz.</p>
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
