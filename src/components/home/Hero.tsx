import Image from "next/image";
import { TiTick } from "react-icons/ti";
import cloudImage from "../../../public/cloud-hosting.png";
import styles from "./hero.module.css";
const Hero = () => {
  return (
    <div
      className={`flex items-center justify-around ${styles.hero}`}
    >
      {/* heroLeft */}
      <div className={styles.heroLeft}>
        <h1 className="text-3xl font-bold text-black capitalize mb-3">
          Cloud Hosting
        </h1>
        <p className="capitalize text-lg md:text-xl text-gray-600">
          the best web hosting solution for your online success
        </p>
        <div className="p-3 mt-3">
          <div className="capitalize text-gray-700 text-md font-bold flex items-center gap-1 mb-2">
            <TiTick /> easy to use control panel
          </div>
          <div className="capitalize text-gray-700 text-md font-bold flex items-center gap-1  mb-2">
            <TiTick />
            secure hosting
          </div>
          <div className="capitalize text-gray-700 text-md font-bold flex items-center gap-1 ">
            <TiTick /> website maintenance
          </div>
        </div>
      </div>
      {/* heroRight */}
      <div>
        <Image src={cloudImage} alt="cloud" width={500} height={500} loading="eager"/>
      </div>
    </div>
  );
};

export default Hero;
