import React from "react";
import { Address } from "../components";
import "antd/dist/antd.css";
import { Button, Card, Empty } from "antd";
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
  data,
  mainnetProvider,
  blockExplorer,
}) {
  return (
    <div style={{ padding: 8, marginTop: 32, width: 500, margin: "auto" }}>
      <Card
        title={title}
        headStyle={{
          borderRadius: 5,
          textAlign: "center",
        }}
        bodyStyle={{
          borderRadius: 10,
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
      <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-center text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th>Address</th>
                  {/* <th className="px-4 py-3">wallet Address</th> */}
                  {/* <th className="px-4 py-3">Position</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {data ? (
                  data?.map((account, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-300 dark:text-gray-300"
                    >
                      <td className="text-xs py-2 text-center tracking-wide font-semibold leading-tight text-slate-700 ">
                        <Address address={account} ensProvider={mainnetProvider} blockExplorer={blockExplorer} />
                      </td>
                      {/* <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight text-slate-700   dark:text-green-100">
                          {" "}
                          Teacher{" "}
                        </span>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <Empty />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
