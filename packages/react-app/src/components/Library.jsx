import React, { useState } from "react";

export default function BigTransfer({ writeContracts, tx }) {

    return (
        <div style={{backgroundColor: "#636C78"}}>
            <section id="#Library"  data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b" className="section mod--hero ">
                <h1 className="heading--center" style={{color: "#fff"}}>
                    Library
                </h1>
                <div className="flex">
                    <div className="flex-personal">
                        <div data-w-id="23aa82da-d192-8dd9-fd6c-34b1289acbf1" className="content">                              
                            <div data-w-id="f29f62bd-d2b8-d92f-ba3b-fec3f8494fcb" className="swiper-slide mod--work">
                                <div className="work__card">
                                    <div className="work__ico-wrap">
                                        <div className="work__ico-anim">
                                            <img src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg" 
                                            loading="lazy" alt="" className="work__ico"/>
                                            <img src="https://uploads-ssl.webflow.com/61c1b5d6cb8a0046c7fa6e82/61c1c00a889e5f20911275b4_work_ico-01.svg" 
                                            loading="eager" alt="" className="work__ico mod--over"/>
                                        </div>
                                    </div>
                                    <h3 className="work__title">
                                        Book Title
                                    </h3>
                                    <p className="work__p">Book Description </p>
                                    <a href="" download="">
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}