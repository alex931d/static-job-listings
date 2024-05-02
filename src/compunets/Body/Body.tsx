import { useLayoutEffect, useRef } from "react";
import { IJob, IProject } from "../../contexts/types";
import Card from "../Card/Card";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import "./Body.css";
gsap.registerPlugin(ScrollTrigger);
interface BodyProps {
  state: IProject;
  activeTags: string[];
  toggleActive: (tag: string) => void;
}

function Body({ state, activeTags, toggleActive }: BodyProps) {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const filteredState = state.filter((job: IJob) => {
    return (
      activeTags.some((tag) => job.languages.includes(tag)) ||
      activeTags.some((tag) => job.tools.includes(tag)) ||
      state
    );
  });
  useLayoutEffect(() => {
    gsap.from(".menu", {
      scrollTrigger: {
        trigger: "main",
        start: "top 10%",
        end: "top 20%",
        markers: false,
        scrub: 1,
      },
      scale: 1.05,
      duration: 0.5,
    });
  }, []);
  useLayoutEffect(() => {
    gsap.set(cardsRef.current, {
      autoAlpha: 0,
      transformOrigin: "50% 50%",
      x: 30,
    });

    const TL = gsap.timeline({
      defaults: {
        stagger: {
          amount: 1.0,
        },
        autoAlpha: 1,
        x: 30,
        ease: `back.out(6)`,
      },
    });

    TL.to(cardsRef.current, {
      opacity: 1,
      x: 0,
    });
  }, [filteredState]);

  return (
    <>
      <main>
        <div className="card-wrapper">
          {filteredState.map((card: IJob, cardIndex: number) => (
            <Card
              ref={(el) => el && (cardsRef.current[cardIndex] = el)}
              job={card}
              key={cardIndex}
              toggleActive={toggleActive}
              activeTags={activeTags}
            />
          ))}
        </div>
      </main>
    </>
  );
}
export default Body;
