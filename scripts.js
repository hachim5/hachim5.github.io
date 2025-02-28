document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');

    // فتح وإغلاق القائمة الجانبية
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // التنقل السلس وتوسيع الأقسام
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // إغلاق القائمة الجانبية
            sidebar.classList.remove('open');

            // إزالة حالة التوسع من جميع الأقسام
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('expanded');
            });

            // توسيع القسم المستهدف
            targetSection.classList.add('expanded');

            // التمرير إلى القسم
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // توسيع الأقسام عند النقر على العنوان
    document.querySelectorAll('.card h2').forEach(header => {
        header.addEventListener('click', function() {
            const card = this.parentElement;
            card.classList.toggle('expanded');
        });
    });

    // تهيئة الخريطة التفاعلية
    const map = L.map('map').setView([54.5260, 15.2551], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // حدود 1918
    const borders1918 = L.geoJSON({
        "type": "FeatureCollection",
        "features": [
            {"type": "Feature", "geometry": {"type": "Polygon", "coordinates": [[[20, 50], [30, 50], [30, 55], [20, 55], [20, 50]]]}, "properties": {"name": "الإمبراطورية الألمانية", "year": "1918"}},
            {"type": "Feature", "geometry": {"type": "Polygon", "coordinates": [[[30, 55], [40, 55], [40, 60], [30, 60], [30, 55]]]}, "properties": {"name": "الإمبراطورية الروسية", "year": "1918"}}
        ]
    }, {style: {color: "#ff0000", weight: 3, opacity: 0.9, fillOpacity: 0.3}});

    // حدود 1929
    const borders1929 = L.geoJSON({
        "type": "FeatureCollection",
        "features": [
            {"type": "Feature", "geometry": {"type": "Polygon", "coordinates": [[[20, 50], [25, 50], [25, 55], [20, 55], [20, 50]]]}, "properties": {"name": "جمهورية فايمار", "year": "1929"}},
            {"type": "Feature", "geometry": {"type": "Polygon", "coordinates": [[[25, 50], [30, 50], [30, 55], [25, 55], [25, 50]]]}, "properties": {"name": "بولندا", "year": "1929"}}
        ]
    }, {style: {color: "#00ff00", weight: 3, opacity: 0.9, fillOpacity: 0.3}});

    // دوال الخريطة
    window.show1918 = function() {
        map.eachLayer(layer => { if (layer !== map._layers[Object.keys(map._layers)[0]]) map.removeLayer(layer); });
        borders1918.addTo(map);
        borders1918.eachLayer(layer => {
            layer.bindPopup(`<b>${layer.feature.properties.name}</b><br>السنة: ${layer.feature.properties.year}`);
        });
    };

    window.show1929 = function() {
        map.eachLayer(layer => { if (layer !== map._layers[Object.keys(map._layers)[0]]) map.removeLayer(layer); });
        borders1929.addTo(map);
        borders1929.eachLayer(layer => {
            layer.bindPopup(`<b>${layer.feature.properties.name}</b><br>السنة: ${layer.feature.properties.year}`);
        });
    };
});
