import { NureIcon } from "@/components/icons/NureIcon";
import { CareerCenterIcon } from "@/components/icons/CareerCenterIcon";
import { Background } from "@/components/layout/Background";
import classes from "@/assets/landing-logos.module.scss";

export default function LandingPage() {
  return (
    <>
      <Background withOvals={false}/>
      <header className="mt-20 flex flex-col items-center content-center">
        <div className={classes.logos} id="logos">
          <NureIcon />
          <CareerCenterIcon />
        </div>
        <h2
          id="ch-title"
          className="font-rancho mt-4 text-6xl md:text-8xl lg:text-[150px] text-darkerBlue"
        >
          CareerHub
        </h2>
      </header>
    </>
  );
}
