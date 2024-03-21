'use client';

import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  GabIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";

const Style: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: "2em",
  },
  leftColumn: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    color: "white",
  },
  rightColumn: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "right",
    color: "white",
    // border: "white 2px solid"
  },
  hidden: {
    display: "none",
  },
  link: {
    textDecoration: "underline",
    fontWeight: "bold",
  },
  engagementRow: {
    display: "flex",
    justifyContent: "right",
  },
  copyright: {
    display: "flex",
    justifyContent: "right"
  },
  shareButtonGroup: {
    marginLeft: "0.5rem",
    marginBottom: "0.5rem",
    // border: "white 2px solid",
    // height: "fit-content"
  },
  desktop: {
    flexGrow: "1",
    flexBasis: "100vw",
    display: "var(--navbarFullDisplay)",  // flex over 700px, none under 700px
    flexDirection: "row",
  },
  mobile: {
    flexGrow: "1",
    display: "var(--navbarHamburgerDisplay)",  // none over 700px, flex under 700px
    flexDirection: "column",
  },
};

type Props = {
  venueName: string,
  address: string,
  telAreaCode: string,
  telNum: string,
  orgEmail: string,
  faxAreaCode: string,
  faxNum: string,
  mobile: string,
  copyrightYear: string,
}

export const Footer = ({
  venueName,
  address,
  telAreaCode,
  telNum,
  orgEmail,
  faxAreaCode,
  faxNum,
  mobile,
  copyrightYear,
}: Props) => {
  const hrefVal = `mailto:${orgEmail}`;

  return (<div style={Style.container}>
    <div style={Style.desktop}>
      <div style={Style.leftColumn}>
        <p>{venueName} - {address}</p>
        <p>Email: <a href={hrefVal} target="_self" style={Style.link}>{orgEmail}</a></p>
        <p>Tel: ({telAreaCode}) {telNum} / Fax: ({faxAreaCode}) {faxNum}  /  Mobile: {mobile}</p>
      </div>
      <div style={Style.rightColumn}>
        <div style={Style.engagementRow}>
          <LineShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
            <LineIcon size={35} round={false} borderRadius={10} />
          </LineShareButton>
          <FacebookShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
            <FacebookIcon size={35} round={false} borderRadius={10} />
          </FacebookShareButton>
          <LinkedinShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
            <LinkedinIcon size={35} round={false} borderRadius={10} />
          </LinkedinShareButton>
          <RedditShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
            <RedditIcon size={35} round={false} borderRadius={10} />
          </RedditShareButton>
        </div>
        <a style={Style.copyright} href={hrefVal} target="_self">©{copyrightYear} by 寶嚴禪寺</a>
      </div>
    </div>

    <div style={Style.mobile}>
      <div style={{ display: "flex", justifyContent: "left" }}>
        <LineShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
          <LineIcon size={50} round={false} borderRadius={10} />
        </LineShareButton>
        <FacebookShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
          <FacebookIcon size={50} round={false} borderRadius={10} />
        </FacebookShareButton>
        <LinkedinShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
          <LinkedinIcon size={50} round={false} borderRadius={10} />
        </LinkedinShareButton>
        <RedditShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
          <RedditIcon size={50} round={false} borderRadius={10} />
        </RedditShareButton>
      </div>
      <div>
        <p>{venueName} - {address}</p>
        <p>Email: <a href={hrefVal} target="_self" style={Style.link}>{orgEmail}</a></p>
        <p>Fax: ({faxAreaCode}) {faxNum}</p>
        <p>Tel: ({telAreaCode}) {telNum}</p>
        <p>Mobile: {mobile}</p>
        <a href={hrefVal} target="_self">©{copyrightYear} by 寶嚴禪寺</a>
      </div>
    </div>
  </div>);

};