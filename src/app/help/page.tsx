import React from "react";

const HelpPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Yardım Merkezi</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sıkça Sorulan Sorular */}
        <div className="bg-card border border-border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-foreground">
                Siparişimi nasıl takip edebilirim?
              </h3>
              <p className="text-muted-foreground text-sm">
                Siparişlerim sayfasından tüm siparişlerinizi görüntüleyebilir ve
                durumlarını takip edebilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                İade işlemi nasıl yapılır?
              </h3>
              <p className="text-muted-foreground text-sm">
                Ürün teslim tarihinden itibaren 14 gün içinde iade talebinde
                bulunabilirsiniz.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">
                Ödeme yöntemleri nelerdir?
              </h3>
              <p className="text-muted-foreground text-sm">
                Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.
              </p>
            </div>
          </div>
        </div>

        {/* İletişim Bilgileri */}
        <div className="bg-card border border-border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">İletişim</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-foreground">Müşteri Hizmetleri</h3>
              <p className="text-muted-foreground text-sm">444 0 123</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">E-posta</h3>
              <p className="text-muted-foreground text-sm">destek@tempshop.com</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Çalışma Saatleri</h3>
              <p className="text-muted-foreground text-sm">
                Pazartesi - Cuma: 09:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Yardım Kategorileri */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Yardım Kategorileri</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-foreground mb-2">
              Sipariş ve Teslimat
            </h3>
            <p className="text-muted-foreground text-sm">
              Sipariş verme, takip etme ve teslimat süreçleri hakkında bilgiler.
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-foreground mb-2">
              Ödeme ve Faturalama
            </h3>
            <p className="text-muted-foreground text-sm">
              Ödeme yöntemleri, faturalama ve ödeme sorunları hakkında bilgiler.
            </p>
          </div>
          <div className="bg-card border border-border p-4 rounded-lg shadow-md">
            <h3 className="font-medium text-foreground mb-2">İade ve Değişim</h3>
            <p className="text-muted-foreground text-sm">
              İade koşulları, değişim süreçleri ve iade talepleri hakkında
              bilgiler.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
