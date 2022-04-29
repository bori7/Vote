import React from "react";

import { Button, Card } from "antd";
import { UploadFile } from "../components";

export default function UploadComp({
  setSameBatchUpload,
  setSameBatchData,
  setSameBuying,
  sameBuying,
  sameBatchUpload,
  sameBatchData,
  title,
  tx,
  func,
}) {
  return (
    <div style={{ padding: 8, marginTop: 32, width: 500, margin: "auto" }}>
      <Card
        title={title}
        headStyle={{
          borderRadius: 5,
          textAlign: "center",
          // background:
          //   "linear-gradient(90deg, rgba(63,141,251,0.7469581582633054) 0%, rgba(252,70,210,0.6797312675070029) 100%)",
        }}
        bodyStyle={{
          borderRadius: 10,
          // background:
          //   "linear-gradient(-50deg, rgba(63,141,251,0.7301514355742297) 0%, rgba(252,70,210,0.6685267857142857) 100%)",
        }}
      >
        {/* <div style={{ padding: 8 }}>{tokensPerEth && tokensPerEth.toNumber()} tokens per ETH</div> */}
        <div style={{ padding: 8, textAlign: "center" }}>
          <UploadFile setBatchUpload={setSameBatchUpload} setBatchData={setSameBatchData} />
        </div>

        <div style={{ padding: 8, textAlign: "center" }}>
          <Button
            type={"primary"}
            loading={sameBuying}
            onClick={async () => {
              // console.log(sameBatchData)
              setSameBuying(true);
              try {
                await tx(func(sameBatchData.accounts));
                //  console.log(batchData.amounts)
              } catch (error) {
                console.error(error);
              } finally {
                setSameBuying(false);
              }
            }}
            disabled={!sameBatchUpload}
          >
            {title}
          </Button>
        </div>
      </Card>
    </div>
  );
}
