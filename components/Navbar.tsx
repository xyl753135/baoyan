import styles from "../app/page.module.css";

const Style: { [key: string]: React.CSSProperties } = {
  menuLabel: {
    fontFamily: "georgia", // branding yellow
    fontSize: "1.2rem",
    color: "white",
    fontWeight: "normal",
  },
  navButton: {
    padding: "1rem",
    borderRadius: "var(--border-radius)",
    background: "rgba(var(--card-rgb), 0)",
    border: "1px solid rgba(var(--card-border-rgb), 0)",
    transition: "background 200ms, border 200ms",
  }
};

type Props = {
  menuLabels: Array<string>,
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined,
  className: string,
  label: string,
}

export const Navbar = ({


}: Props) => {
  return (<div className={styles.grid}>
    <a
      href="/"
      target="_self">
        <img src="https://static.wixstatic.com/media/054b17_f6c21ab2db7b4d648dfafa3114e9009e~mv2.png/v1/fill/w_105,h_88,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/054b17_f6c21ab2db7b4d648dfafa3114e9009e~mv2.png" alt="" ></img>
    </a>
    <a
      href="https://www.baoyan.org/%E8%AA%8D%E8%AD%98%E5%AF%B6%E5%9A%B4"
      // className={styles.card}
      style={Style.navButton}
      target="_self"
    // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>認識寶嚴</h2>
    </a>

    <a href="/news" style={Style.navButton} target="_self"
      // className={styles.card}
    >
      <h2 style={Style.menuLabel}>最新消息</h2>
    </a>

    <a href="https://www.baoyan.org/2024%E8%AA%B2%E7%A8%8B%E8%A1%A8" className={styles.card} target="_self"
      // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>年度課程</h2>
    </a>

    <a href="https://www.baoyan.org/2024%E6%B3%95%E5%8B%99%E5%8F%8A%E6%B4%BB%E5%8B%95" className={styles.card} target="_self"
    // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>法務及活動</h2>
    </a>

    <a href="https://www.baoyan.org/%E6%B3%95%E5%AF%B6%E6%B5%81%E9%80%9A" className={styles.card} target="_self"
    // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>法寶流通/下載</h2>
    </a>

    <a href="" className={styles.card} target="_self"
    // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>捐款護持</h2>
    </a>

    <a href="https://www.baoyan.org/%E6%B7%B1%E5%85%A5%E7%B6%93%E8%97%8F" className={styles.card} target="_self"
    // rel="noopener noreferrer"
    >
      <h2 style={Style.menuLabel}>我的課程</h2>
    </a>
  </div>);

};