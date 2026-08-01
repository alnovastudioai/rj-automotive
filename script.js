/* ==========================================================================
   RJ Performance Automotiva - Custom Interactive Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Sticky Header Scroll Logic ---
    const header = document.getElementById("main-header");
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById("menu-toggle");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const body = document.body;

    const toggleMenu = () => {
        menuToggle.classList.toggle("open");
        mobileDrawer.classList.toggle("open");
        
        if (mobileDrawer.classList.contains("open")) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }
    };

    menuToggle.addEventListener("click", toggleMenu);

    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileDrawer.classList.contains("open")) {
                toggleMenu();
            }
        });
    });

    // --- Interactive Fleet ROI Calculator ---
    const numVehiclesInput = document.getElementById("num-vehicles");
    const fuelSpendInput = document.getElementById("fuel-spend");
    const vehiclesValDisplay = document.getElementById("vehicles-val");
    const fuelValDisplay = document.getElementById("fuel-val");
    const savingsAmountDisplay = document.getElementById("savings-amount");

    const calculateSavings = () => {
        if (!numVehiclesInput || !fuelSpendInput) return;

        const vehicles = parseInt(numVehiclesInput.value);
        const fuelPerVehicle = parseFloat(fuelSpendInput.value);

        // Update displays
        vehiclesValDisplay.textContent = `${vehicles} Veículos`;
        fuelValDisplay.textContent = `R$ ${fuelPerVehicle.toLocaleString('pt-BR')}`;

        // Calculate: Average 18% fuel efficiency gain with Direção Econômica Master Drive
        const monthlyTotalSpend = vehicles * fuelPerVehicle;
        const monthlySavings = monthlyTotalSpend * 0.18;
        const annualSavings = monthlySavings * 12;

        // Format to BRL currency
        const formattedSavings = annualSavings.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });

        savingsAmountDisplay.textContent = formattedSavings;
    };

    if (numVehiclesInput && fuelSpendInput) {
        numVehiclesInput.addEventListener("input", calculateSavings);
        fuelSpendInput.addEventListener("input", calculateSavings);
        calculateSavings(); // Initial calculation
    }

    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // --- Active Link Tracking ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const trackActiveLink = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", trackActiveLink);
    trackActiveLink();
});
