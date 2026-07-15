"use client";

import { useCMSStore } from "@/store/cmsStore";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const { contactSettings, addMessage } = useCMSStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addMessage({
      fullName: fd.get("name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      subject: fd.get("subject") as string,
      message: fd.get("message") as string,
    });
    alert("Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Bize Ulaşın
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400"
            >
              Sorularınız, önerileriniz veya danışmanlık talepleriniz için her zaman buradayız.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Adres</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{contactSettings.address}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Telefon</h3>
              {contactSettings.phones.map((p: string, i: number) => (
                <p key={i} className="text-sm text-slate-500 dark:text-slate-400">{p}</p>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 text-center">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-brand-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">E-posta</h3>
              {contactSettings.emails.map((e: string, i: number) => (
                <p key={i} className="text-sm text-slate-500 dark:text-slate-400">{e}</p>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Mesaj Gönderin</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="name" required placeholder="Adınız Soyadınız" className="h-12 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                  <input name="email" required type="email" placeholder="E-posta Adresiniz" className="h-12 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <input name="phone" placeholder="Telefon Numaranız" className="w-full h-12 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                <input name="subject" required placeholder="Konu" className="w-full h-12 px-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-brand-500" />
                <textarea name="message" required rows={4} placeholder="Mesajınız..." className="w-full p-5 rounded-[2rem] border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
                <Button type="submit" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-brand-500/20">
                  <Send className="w-5 h-5 mr-2" /> Gönder
                </Button>
              </form>
            </motion.div>

            {/* Map & Extra Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-full h-[400px] rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
                <iframe 
                  src={`https://www.google.com/maps?q=${encodeURIComponent(contactSettings.address)}&output=embed`}
                  className="w-full h-full border-0 grayscale dark:invert-[0.9] opacity-80"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="bg-brand-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-brand-500/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Çalışma Saatlerimiz</h4>
                    <p className="text-white/80 text-sm">{contactSettings.workingHours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Hızlı Destek</h4>
                    <p className="text-white/80 text-sm">WhatsApp üzerinden bize yazabilirsiniz.</p>
                    <a href={`https://wa.me/${contactSettings.whatsapp.replace(/\D/g, "")}`} className="text-white font-bold underline mt-1 inline-block">
                      {contactSettings.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
