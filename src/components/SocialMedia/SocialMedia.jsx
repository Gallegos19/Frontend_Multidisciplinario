import React from 'react';
import Style from './SocialMedia.module.css';
import { SlSocialInstagram } from 'react-icons/sl';
import { TiSocialFacebook, TiSocialTwitter } from 'react-icons/ti';
import { FaWhatsapp } from 'react-icons/fa';
import {BiLogoGmail} from 'react-icons/bi'

const SocialMediaIcons = () => {
  return (
    <div className={Style.card}>
      <a href="#" className={`${Style.socialContainer} ${Style.containerOne}`}>
        <SlSocialInstagram size={16} className={Style.socialSvg} />
      </a>

      <a href="#" className={`${Style.socialContainer} ${Style.containerTwo}`}>
        <TiSocialTwitter size={16} className={Style.socialSvg} />
      </a>

      <a href="#" className={`${Style.socialContainer} ${Style.containerThree}`}>
        <TiSocialFacebook size={16} className={Style.socialSvg} />
      </a>

      <a href="#" className={`${Style.socialContainer} ${Style.containerFour}`}>
        <FaWhatsapp size={16} className={Style.socialSvg} />
      </a>
      <a href="#" className={`${Style.socialContainer} ${Style.containerFive}`}>
        <BiLogoGmail size={16} className={Style.socialSvg} />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
