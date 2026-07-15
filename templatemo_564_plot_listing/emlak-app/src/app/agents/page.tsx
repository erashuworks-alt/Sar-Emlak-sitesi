import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";

const agents = [
  { id: 1, name: "Ahmet Yılmaz", title: "Kıdemli Emlak Danışmanı", city: "İstanbul", listings: 34, rating: 4.9, phone: "+90 532 111 2233", email: "ahmet@emlakplatform.com", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
  { id: 2, name: "Elif Kaya", title: "Premium Satış Uzmanı", city: "Ankara", listings: 28, rating: 4.8, phone: "+90 533 222 3344", email: "elif@emlakplatform.com", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
  { id: 3, name: "Mert Demir", title: "Lüks Konut Uzmanı", city: "İzmir", listings: 19, rating: 4.7, phone: "+90 534 333 4455", email: "mert@emlakplatform.com", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
  { id: 4, name: "Selin Arslan", title: "Ticari Gayrimenkul Uzmanı", city: "İstanbul", listings: 45, rating: 5.0, phone: "+90 535 444 5566", email: "selin@emlakplatform.com", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
  { id: 5, name: "Burak Şahin", title: "Yatırım Danışmanı", city: "Antalya", listings: 22, rating: 4.6, phone: "+90 536 555 6677", email: "burak@emlakplatform.com", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
  { id: 6, name: "Zeynep Çelik", title: "Kiralık Konut Uzmanı", city: "Bursa", listings: 31, rating: 4.8, phone: "+90 537 666 7788", email: "zeynep@emlakplatform.com", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Uzman Danışmanlarımız</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Alanında uzman, güvenilir ve lisanslı danışmanlarımızla doğru yatırımı yapın.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="p-8 text-center">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden relative mb-4 ring-4 ring-brand-100 dark:ring-brand-900/30">
                  <Image src={agent.image} alt={agent.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{agent.name}</h3>
                <p className="text-brand-600 dark:text-brand-400 text-sm font-medium mb-3">{agent.title}</p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{agent.rating}</span>
                </div>
                <div className="flex justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{agent.city}</div>
                  <div>{agent.listings} İlan</div>
                </div>
                <div className="flex flex-col gap-3">
                  <a href={`tel:${agent.phone.replace(/\s/g, '')}`}>
                    <Button variant="outline" className="w-full rounded-xl flex items-center gap-2 justify-center">
                      <Phone className="w-4 h-4" /> Ara
                    </Button>
                  </a>
                  <a href={`mailto:${agent.email}`}>
                    <Button className="w-full rounded-xl flex items-center gap-2 justify-center">
                      <Mail className="w-4 h-4" /> Mesaj Gönder
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
