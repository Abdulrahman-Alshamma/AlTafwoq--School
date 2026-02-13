        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Tajawal', 'sans-serif'],
                    },
                    colors: {
                        primary: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            800: '#075985',
                            900: '#0c4a6e',
                            950: '#052a3d', 
                        },
                        accent: {
                            400: '#e8fb70', 
                            500: '#d4f037',
                        },
                        background: '#f5f0f0',
                    },
                    animation: {
                        'marquee': 'marquee 30s linear infinite',
                        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                    },
                    keyframes: {
                        marquee: {
                            '0%': { transform: 'translateX(0)' },
                            '100%': { transform: 'translateX(-50%)' },
                        },
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                }
            }
        }



        document.addEventListener('DOMContentLoaded', () => {
            
            lucide.createIcons();

            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if(mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });

                document.querySelectorAll('#mobile-menu a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileMenu.classList.add('hidden');
                    });
                });
            }

            const navbar = document.getElementById('navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-primary-950/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
                    navbar.classList.remove('bg-transparent', 'py-5');
                } else {
                    navbar.classList.remove('bg-primary-950/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
                    navbar.classList.add('bg-transparent', 'py-5');
                }
            });

            const revealElements = document.querySelectorAll('.reveal');
            
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.15,
            });

            revealElements.forEach(el => revealObserver.observe(el));

            function showToast(message, type = 'success') {
                const container = document.getElementById('toast-container');
                const toast = document.createElement('div');
                
                const bgColor = type === 'success' ? 'bg-white border-green-500' : 'bg-white border-red-500';
                const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';
                const iconName = type === 'success' ? 'check-circle' : 'alert-circle';

                toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-lg shadow-lg border-r-4 ${bgColor} min-w-[300px] transform transition-all duration-300 translate-x-full opacity-0`;
                
                toast.innerHTML = `
                    <div class="${iconColor}">
                        <i data-lucide="${iconName}" class="w-5 h-5"></i>
                    </div>
                    <span class="text-sm font-medium text-gray-800">${message}</span>
                `;

                container.appendChild(toast);
                lucide.createIcons();

                requestAnimationFrame(() => {
                    toast.classList.remove('translate-x-full', 'opacity-0');
                });

                setTimeout(() => {
                    toast.classList.add('translate-x-full', 'opacity-0');
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }

            const form = document.getElementById('registrationForm');
            if(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    const parentName = document.getElementById('parentName').value;
                    const phone = document.getElementById('phone').value;
                    const studentName = document.getElementById('studentName').value;
                    const grade = document.getElementById('grade').value;

                    if (!parentName || !phone || !studentName || !grade) {
                        showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                        return;
                    }

                    if (phone.length < 10) {
                        showToast('رقم الهاتف يجب أن يكون 10 أرقام على الأقل', 'error');
                        return;
                    }

                    showToast('تم استلام طلبك بنجاح! سنرد عليك قريباً.', 'success');
                    form.reset();
                });
            }
        });