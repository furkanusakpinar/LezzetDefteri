const tarifler = [
    {
        id: '1',
        isim: 'Menemen',
        sure: 20,
        resim: 'https://images.unsplash.com/photo-1628190772097-9e767425f190?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        malzemeler: ['3 Yumurta', '2 Domates', '2 Biber', 'Tuz', 'Sıvı Yağ'],
        yapilis: 'Biberleri doğrayıp yağda kavurun. Domatesleri ekleyin. Suyunu çekince yumurtaları kırıp karıştırın. Tuz ekleyip 2-3 dakika daha pişirin.',
        zorluk: 'orta',
        kategori: 'Kahvaltılık'
    },
    {
        id: '2',
        isim: 'Makarna',
        sure: 25,
        resim: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        malzemeler: ['250g Makarna', 'Su', 'Tuz', 'Salça', 'Sıvı Yağ'],
        yapilis: 'Suyu kaynatıp makarnayı haşlayin. Ayrı tavada yağda salçayı kavurun. Süzülen makarnayı sosla karıştırın.',
        zorluk: 'kolay',
        kategori: 'Ana Yemek'
    },
    {
        id: '3',
        isim: 'Kaşarlı Tost',
        sure: 10,
        resim: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        malzemeler: ['2 Dilim Ekmek', 'Kaşar Peyniri', 'Domates', 'Tereyağı'],
        yapilis: 'Ekmeklerin arasına kaşar ve domates dilimlerini koyun. Tost makinesinde veya tavada her iki tarafını kızartın.',
        zorluk: 'kolay',
        kategori: 'Atıştırmalık'
    },
    {
        id: '4',
        isim: 'Yumurtalı Patates',
        sure: 30,
        resim: 'https://images.unsplash.com/photo-1504113888839-1c8eb81ee04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        malzemeler: ['3 Patates', '3 Yumurta', 'Tuz', 'Karabiber', 'Sıvı Yağ'],
        yapilis: 'Patatesleri küp küp doğrayıp yağda kızartın. Üzerine yumurtaları kırıp karıştırın. Tuz ve karabiber ekleyip pişirin.',
        zorluk: 'orta',
        kategori: 'Kahvaltılık'
    },
    {
        id: '5',
        isim: 'Peynirli Omlet',
        sure: 10,
        resim: 'https://images.unsplash.com/photo-1510693524250-9665bc72111c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        malzemeler: ['3 Yumurta', 'Tuz', 'Karabiber', 'Tereyağı', 'Maydanoz'],
        yapilis: 'Yumurtaları kase içinde çırpın. Tuz ve karabiber ekleyin. Tavada tereyağını eritip yumurtaları dökün. Altı pişince katlayın, maydanoz serpin.',
        zorluk: 'kolay',
        kategori: 'Kahvaltılık'
    },
];

export default tarifler;