'use strict';


// Preload
const preloader = document.querySelector("[data-preload]");
window.addEventListener("load",function (){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});



// add event listener on multiple elements 
const addEventOnElements = function (elements,eventType,callback){
    for (let i=0 , len = elements.length; i< len; i++){
        elements[i].addEventListener(eventType,callback);
    }
}


// navbar
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click" , toggleNavbar);

// header

const header = document.querySelector("[data-header]");
let lastScrollPos = 0;
const hideHeader = function (){
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add("hide")
    }
    else{
        header.classList.remove("hide")
    }
    lastScrollPos = window.scrollY;
}
window.addEventListener("scroll", function(){
    if(window.scrollY>=50){
        header.classList.add("active");
        hideHeader();
    }
    else{
        header.classList.remove("active");
    }
})

// Hero
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSliderPos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSliderPos];
}

const slideNext = function () {
    if(currentSliderPos >= heroSliderItems.length - 1 ){
        currentSliderPos = 0;
    }
    else{
        currentSliderPos++;
    }
    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
    if(currentSliderPos <= 0 ){
        currentSliderPos = heroSliderItems.length - 1;
    }
    else{
        currentSliderPos--;
    }
    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;
const autoSlide = function () {
    autoSlideInterval = setInterval(function (){
        slideNext();
    }, 7000);
}
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover" , function () {
    clearInterval(autoSlideInterval);
})
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

document.addEventListener("DOMContentLoaded", function () {
    const momentsSection = document.querySelector(".moments");
    const momentsItems = document.querySelectorAll(".moments-items");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    momentsItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add("momentts");
                        }, index * 200); // Staggered animation
                    });
                    observer.unobserve(entry.target); // Stop observing after animation plays
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    observer.observe(momentsSection);
});


// Counters

// const counters = document.querySelectorAll(".counter-num");
// counters.forEach(counter => {
//     Let initial_count = 0;
//     const final_count = counter.dataset.count;
//     setInterval(updateCounting,1);

//     function updateCounting() {
//         initial_count=initial_count+5;
//         counter.innerText = initial_count;
//     }
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const counters = document.querySelectorAll(".counter");
//     let isScrolled = false;

//     function formatNumber(value) {
//         if (value >= 1000000) return (value / 1000000).toFixed(1) + "M";
//         if (value >= 100000) return (value / 100000).toFixed(1) + "L";
//         return value;
//     }

//     function animateCounters() {
//         counters.forEach(counter => {
//             const target = +counter.getAttribute("data-target");
//             let start = 0;
//             let increment = target / 100;

//             function updateCounter() {
//                 if (start < target) {
//                     start += increment;
//                     counter.innerText = formatNumber(Math.ceil(start));
//                     requestAnimationFrame(updateCounter);
//                 } else {
//                     counter.innerText = formatNumber(target);
//                 }
//             }
//             updateCounter();
//         });
//     }

//     function onScroll() {
//         const section = document.querySelector(".counter-section");
//         const sectionTop = section.getBoundingClientRect().top;
//         const screenPosition = window.innerHeight / 1.5;

//         if (sectionTop < screenPosition && !isScrolled) {
//             animateCounters();
//             isScrolled = true;
//         }
//     }

//     window.addEventListener("scroll", onScroll);

// });

//Custom Reviews
function addReview()
{
    var preview=document.getElementById("custom_review");
    var name=prompt("Your Name:");
    var S=prompt("Enter Star Rating:");
    var review=prompt("Enter Review:");
    var star=""
    var S_1="★☆☆☆☆";
    var S_2="★★☆☆☆";
    var S_3="★★★☆☆";
    var S_4="★★★★☆";
    var S_5="★★★★★";
    if(S==1)
    {
        star=S_1;
    }
    else if(S==2)
    {
        star=S_2;
    }
    else if(S==3)
    {
        star=S_3;
    }
    else if(S==4)
    {
        star=S_4;
    }
    else
    {
        star=S_5;
    }
    preview.innerHTML+='<div class="review-card"><div class="customer-info"><img src="artist-03.png" alt="Customer 3" class="customer-photo"><span class="customer-name">'+name+'</span></div><div class="stars">'+star+'</div><p>'+review+'</p></div>';
}

document.addEventListener("DOMContentLoaded", () => {
    let counters = document.querySelectorAll('.counter');
    let counterSection = document.querySelector('.counter-section');
    let started = false;

    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
        if (num >= 100000) return (num / 100000).toFixed(1) + "L";
        return num;
    }

    function startCounter() {
        counters.forEach(counter => {
            let target = +counter.getAttribute('data-target');
            let count = 0;
            let speed = target / 100; // Speed Adjusted for Smooth Effect

            let updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = formatNumber(Math.floor(count));
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = formatNumber(target);
                }
            };
            updateCount();
        });
    }

    window.addEventListener('scroll', () => {
        let sectionPos = counterSection.getBoundingClientRect().top;
        let screenPos = window.innerHeight / 1.2;
        if (sectionPos < screenPos && !started) {
            startCounter();
            started = true;
        }
    });
});

