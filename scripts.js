var map = L.map('map').setView([54.5260, 15.2551], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var borders1918 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[20, 50], [30, 50], [30, 55], [20, 55], [20, 50]]]
            },
            "properties": { "name": "الإمبراطورية الألمانية", "year": "1918" }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[30, 55], [40, 55], [40, 60], [30, 60], [30, 55]]]
            },
            "properties": { "name": "الإمبراطورية الروسية", "year": "1918" }
        }
    ]
}, {
    style: { color: "#ff0000", weight: 3, opacity: 0.9, fillOpacity: 0.3 }
});

var borders1929 = L.geoJSON({
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[20, 50], [25, 50], [25, 55], [20, 55], [20, 50]]]
            },
            "properties": { "name": "جمهورية فايمار", "year": "1929" }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[25, 50], [30, 50], [30, 55], [25, 55], [25, 50]]]
            },
            "properties": { "name": "بولندا", "year": "1929" }
        }
    ]
}, {
    style: { color: "#00ff00", weight: 3, opacity: 0.9, fillOpacity: 0.3 }
});

function show1918() {
    map.eachLayer(layer => { if (layer !== map._layers[Object.keys(map._layers)[0]]) map.removeLayer(layer); });
    borders1918.addTo(map);
    borders1918.eachLayer(layer => {
        layer.bindPopup(`<b>${layer.feature.properties.name}</b><br>السنة: ${layer.feature.properties.year}`, {
            className: 'custom-popup'
        });
    });
    document.getElementById('map').style.borderColor = '#ff0000';
}

function show1929() {
    map.eachLayer(layer => { if (layer !== map._layers[Object.keys(map._layers)[0]]) map.removeLayer(layer); });
    borders1929.addTo(map);
    borders1929.eachLayer(layer => {
        layer.bindPopup(`<b>${layer.feature.properties.name}</b><br>السنة: ${layer.feature.properties.year}`, {
            className: 'custom-popup'
        });
    });
    document.getElementById('map').style.borderColor = '#00ff00';
}

function playSound() {
    var sound = document.getElementById('background-sound');
    sound.play();
}

var typed = new Typed('.typewriter', {
    strings: [
        "وثيقة تاريخية ملحمية...",
        "من 1918 إلى 1929...",
        "أحداث غيرت وجه أوروبا...",
        "انطلق في رحلة عبر العصور..."
    ],
    typeSpeed: 70,
    backSpeed: 50,
    loop: true,
    cursorChar: '✒'
});

const sections = document.querySelectorAll('.scroll-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

window.onload = function() {
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 2.5s ease';
        document.body.style.opacity = 1;
    }, 300);
};

window.addEventListener('resize', () => {
    map.invalidateSize();
});

L.Map.mergeOptions({
    popup: {
        className: 'custom-popup'
    }
});

document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        section.style.transform = 'scale(1.03)';
        setTimeout(() => {
            section.style.transform = 'scale(1)';
        }, 250);
    });
});

document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
