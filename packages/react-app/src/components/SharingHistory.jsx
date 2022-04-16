import React, { useState, useEffect } from "react";
import { List, Button, Input, Empty } from "antd";

export default function PrivateLibrary({ writeContracts, tx, privateLibrary, mainnetProvider }) {
  const [shareToAddresses, setShareToAddresses] = useState({});

  useEffect(() => {
    console.log("privateLibrary", privateLibrary);
  }, [privateLibrary]);

  return (
    <div style={{ backgroundColor: "#636C78" }}>
      <section id="#Library" data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
        <h1 className="heading--center" style={{ color: "#fff" }}>
          Sharing History
        </h1>

      </section>
    </div>
  );
}
