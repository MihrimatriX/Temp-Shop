import Link from "next/link";

export default function TestRoutesPage() {
  const routes = [
    // Ana kategoriler
    { path: "/categories/women", name: "Kadın" },
    { path: "/categories/men", name: "Erkek" },
    { path: "/categories/baby-kids", name: "Anne & Çocuk" },
    { path: "/categories/electronics", name: "Elektronik" },
    { path: "/categories/home-furniture", name: "Ev & Mobilya" },
    { path: "/categories/supermarket", name: "Süpermarket" },
    { path: "/categories/cosmetics", name: "Kozmetik" },
    { path: "/categories/shoes-bags", name: "Ayakkabı & Çanta" },
    { path: "/categories/sports-outdoor", name: "Spor & Outdoor" },
    { path: "/categories/books-stationery", name: "Kitap & Kırtasiye" },
    
    // Alt kategoriler
    { path: "/categories/women/clothing", name: "Kadın Giyim" },
    { path: "/categories/women/shoes", name: "Kadın Ayakkabı" },
    { path: "/categories/women/bags", name: "Kadın Çanta" },
    { path: "/categories/men/clothing", name: "Erkek Giyim" },
    { path: "/categories/men/shoes", name: "Erkek Ayakkabı" },
    { path: "/categories/electronics/phones-tablets", name: "Telefon & Tablet" },
    { path: "/categories/electronics/computers", name: "Bilgisayar" },
    { path: "/categories/home-furniture/pillows", name: "Yastık" },
    { path: "/categories/home-furniture/home-textiles", name: "Ev Tekstili" },
    { path: "/categories/home-furniture/kitchen", name: "Mutfak" },
    { path: "/categories/home-furniture/furniture", name: "Mobilya" },
    { path: "/categories/home-furniture/bedroom", name: "Yatak Odası" },
    { path: "/categories/home-furniture/living-room", name: "Oturma Odası" },
    
    // Ürün sayfaları
    { path: "/categories/home-furniture/pillows/organic-pillow", name: "Organik Yastık" },
    { path: "/categories/women/clothing/dress", name: "Elbise" },
    { path: "/categories/electronics/phones-tablets/iphone", name: "iPhone" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Route Test Sayfası</h1>
        <p className="text-gray-600 mb-8">
          Aşağıdaki linklere tıklayarak route'ların çalışıp çalışmadığını test edebilirsiniz.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
            >
              <div className="font-medium text-blue-600 hover:text-blue-800">
                {route.name}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {route.path}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Test Edilecek URL'ler:</h2>
          <ul className="text-sm space-y-1">
            <li>• <code>http://localhost:3000/categories/home-furniture/pillows</code></li>
            <li>• <code>http://localhost:3000/categories/home-furniture/home-textiles</code></li>
            <li>• <code>http://localhost:3000/categories/home-furniture/kitchen</code></li>
            <li>• <code>http://localhost:3000/categories/women/clothing</code></li>
            <li>• <code>http://localhost:3000/categories/electronics/phones-tablets</code></li>
            <li>• <code>http://localhost:3000/categories/home-furniture/pillows/organic-pillow</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
