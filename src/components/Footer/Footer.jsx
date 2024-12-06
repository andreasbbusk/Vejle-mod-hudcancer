import styles from "./Footer.module.css";
import FooterLogo from "../../assets/VKS-VMH_logo-small.svg";

// Ikoner
import EmailIcon from "../../assets/Email.png";
import AddressIcon from "../../assets/Location.png";

// Socials
import Facebook from "../../assets/Facebook.png";
import Instagram from "../../assets/instagram.png";
import LinkedIn from "../../assets/linkedin.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <img src={FooterLogo} alt="Logo" className={styles.footerImage} />
      </div>

      <div className={`${styles.footerColumn} ${styles.footerMiddle}`}>
        <div className={styles.row}>
          <div className={styles.iconWrapper}>
            <img src={EmailIcon} alt="Email" className={styles.icon} />
          </div>
          <p>kontakt@vejlemodhudcancer.dk</p>
        </div>

        <div className={styles.row}>
          <div className={styles.separator}></div>
        </div>

        <div className={styles.row}>
          <img src={AddressIcon} alt="Address" className={styles.icon} />
          <p>Torvegade 8D, 7100 Vejle, Denmark</p>
        </div>
        <div className={styles.footer_copyright}>
          <p>
            COPYRIGHT © ALLE RETTIGHEDER FORBEHOLDES <br />
            INDSAMLINGEN KONTROLLERES AF ERNST & YOUNG, VEJLE
          </p>
        </div>
      </div>

      <div className={`${styles.footerColumn} ${styles.footerRight}`}>
        <div className={styles.row}>
          <img src={Facebook} alt="Facebook" className={styles.socialIcon} />
          <img src={Instagram} alt="Instagram" className={styles.socialIcon} />
          <img src={LinkedIn} alt="LinkedIn" className={styles.socialIcon} />
        </div>
        <div className={styles.row}>
          <div className={styles.separator}></div>
        </div>
        <div className={styles.row}>
          <p>@VejleModHudcancer</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
