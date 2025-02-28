document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');

    // تهيئة AOS لتأثيرات التمرير الناعمة
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
    });

    // فتح وإغلاق القائمة الجانبية على الهواتف فقط
    if (window.innerWidth <= 768) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            // تأخير طفيف لعناصر القائمة للسلاسة
            setTimeout(() => {
                const items = sidebar.querySelectorAll('ul li');
                items.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                });
            }, 50);
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

            // التمرير السلس إلى القسم
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
            // إعادة تهيئة AOS للسلاسة عند النقر
            setTimeout(() => {
                AOS.refresh();
            }, 50);
        });
    });

    // تأثير البارالاكس للخلفية
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.parallax-bg').style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });
});
