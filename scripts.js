document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');

    // تهيئة AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // تأثير الكتابة الآلية باستخدام Typed.js
    const typed = new Typed('.typed-text', {
        strings: [
            "أوروبا: من الحرب إلى الأزمة",
            "من 1918 إلى 1929",
            "رحلة عبر التاريخ"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // فتح وإغلاق القائمة الجانبية على الهواتف فقط
    if (window.innerWidth <= 768) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // التنقل السلس وتوسيع الأقسام
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // إغلاق القائمة الجانبية على الهواتف
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }

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
});
