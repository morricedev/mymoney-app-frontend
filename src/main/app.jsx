import React from "react";

import Header from "../common/template/header";
import Sidebar from "../common/template/sideBar";
import Footer from "../common/template/footer";
import Messages from "../common/msg/messages";

const app = (props) => (
  <div className="wrapper">
    <Header />
    <Sidebar />
    <div className="content-wrapper">{props.children}</div>
    <Footer />
    <Messages />
  </div>
);

export default app;
