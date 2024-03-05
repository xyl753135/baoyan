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
    marginTop: "2em",
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
  }
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
  const hrefVal = `mailto:${ orgEmail }`;
  
  return (<div style={Style.container}>
    <div style={Style.leftColumn}>
      <p>{venueName} - {address}</p>
      <p>Email: <a href={hrefVal} target="_self" style={Style.link}>{orgEmail}</a></p>
      <p>Tel: ({telAreaCode}) {telNum} / Fax: ({faxAreaCode}) {faxNum}  /  Mobile: {mobile}</p>
    </div>
    <div style={Style.rightColumn}>
      <div style={Style.engagementRow}>
        <LineShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery, 官網"} style={Style.shareButtonGroup}>
          <LineIcon size={50} round={false} borderRadius={10} />
        </LineShareButton>
        <FacebookShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
          <FacebookIcon size={50} round={false} borderRadius={10} />
        </FacebookShareButton>
        <LinkedinShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
          <LinkedinIcon size={50} round={false} borderRadius={10} />
        </LinkedinShareButton>
        <RedditShareButton url={"https://www.baoyan.org/"} title={"寶嚴禪寺 Baoyan Chan Monastery，官網"} style={Style.shareButtonGroup}>
          <RedditIcon size={50} round={false} borderRadius={10} />
        </RedditShareButton>
      </div>
      <a style={Style.copyright} href={hrefVal} target="_self">©{copyrightYear} by 寶嚴禪寺</a>
    </div>
  </div>);

};