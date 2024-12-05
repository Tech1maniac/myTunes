import React, { useEffect } from "react";
import gsap from "gsap";
import anime from "animejs";
import './Landingpage.css'

const LandingPage = () => {
  useEffect(() => {
    const btn = document.querySelector(".btn");

    btn.addEventListener("click", function () {
      gsap.to(".btn", 1, {
        opacity: 0,
        y: -40,
        ease: "expo.inOut",
      });

      gsap.to(".text-wrapper > div", 1, {
        x: "500",
        ease: "expo.inOut",
        delay: 1,
        stagger: 0.1,
      });

      gsap.to(".text-wrapper", 3, {
        y: -600,
        scale: 4.5,
        rotate: -90,
        ease: "expo.inOut",
        delay: 1.5,
      });

      gsap.to(".text", 1, {
        opacity: 1,
        ease: "expo.inOut",
        delay: 3,
      });

      gsap.to(".text-wrapper > div", 4, {
        x: "-3500",
        ease: "expo.inOut",
        delay: 3.5,
        stagger: 0.05,
      });

      gsap.to(".text-container", 2, {
        bottom: "-100%",
        ease: "expo.inOut",
        delay: 6,
      });

      let textWrapper = document.querySelector(".header");
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );

      anime.timeline().add({
        targets: ".header .letter",
        opacity: [0, 1],
        translateY: [200, 0],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 2000,
        delay: (el, i) => 7000 + 40 * i,
      });
    });
  }, []);

  return (
    <div className="container">
      <button className="btn">Enter</button>

      <div className="text-container"></div>
      <div className="text-wrapper">
        <div className="text">
          Zealously few furniture repulsive agreeable consisted. Zealously few
          furniture repulsive agreeable consisted.
        </div>
        <div className="text">
          Collected breakfast estimable questions in to it. Collected breakfast
          estimable questions in to it.
        </div>
        <div className="text">
          For him precaution any advantages dissimilar few. For him precaution
          any advantages dissimilar few.
        </div>
        <div className="text">
          Shortly respect ask cousins brought add tedious nay. Shortly respect
          ask cousins brought add tedious nay.
        </div>
        <div className="text">
          Object remark lively all did feebly excuse our wooded. Object remark
          lively all did feebly excuse our wooded.
        </div>
        <div className="text">
          Sufficient unpleasing an insensible motionless if ye. Sufficient
          unpleasing an insensible motionless if ye.
        </div>
        <div className="text">
          The for fully had she there leave merit enjoy forth. The for fully had
          she there leave merit enjoy forth.
        </div>
        <div className="text">
          In in written on charmed justice is amiable farther. In in written on
          charmed justice is amiable farther.
        </div>
        <div className="text">
          How daughters not promotion few knowledge contented. How daughters not
          promotion few knowledge contented.
        </div>
        <div className="text">
          Zealously few furniture repulsive. Zealously few furniture repulsive.
        </div>
        <div className="text">
          Collected breakfast estimable questions in to it. Collected breakfast
          estimable questions in to it.
        </div>
        <div className="text">
          For him precaution any advantages dissimilar few. For him precaution
          any advantages dissimilar few.
        </div>
        <div className="text">
          Shortly respect ask cousins brought add tedious nay. Shortly respect
          ask cousins brought add tedious nay.
        </div>
        <div className="text">
          Object remark lively all did feebly excuse wooded. Object remark
          lively all did feebly excuse wooded.
        </div>
        <div className="text">
          Sufficient unpleasing an insensible motionless ye. Sufficient
          unpleasing an insensible motionless ye.
        </div>
      </div>
      <div className="header">
        <button>
          <a href="http://localhost:5375">myTunes</a>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
