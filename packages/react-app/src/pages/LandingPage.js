import React from 'react'
import {FaLock, FaSwift, FaExpandArrowsAlt} from "react-icons/fa"

const LandingPage = () => {
  return (
    <section class="relative  bg-blueGray-50">
        <button role="button" class="bg-blue-600 hover:bg-blue-700 fixed z-10 top-3  md:right-4    text-white text-sm px-4 py-2  border rounded-full">
            Connect Wallet
 </button>
    <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
    
            <div class="absolute top-0 w-full h-full bg-center bg-cover">
              <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
            </div>
            <div class="container relative mx-auto">
              <div class="items-center flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                  <div class="pr-12">
                    <h1 class="text-white font-semibold text-5xl">
                      Vote Now, Vote Well.
                    </h1>
                    <p class="mt-4 text-lg text-blueGray-200 dark:text-white">
                      This is a decentralized voting website
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px">
              <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
              </svg>
            </div>
          </div>
          <section class="pb-10 bg-blueGray-200 -mt-24">
            <div class="container mx-auto px-4">
              <div class="flex flex-wrap">
                <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                        <FaExpandArrowsAlt/>
                      </div>
                      <h6 class="text-xl font-semibold">Decentralized</h6>
                      <p class="mt-2 mb-4 text-blueGray-500">
                        Divide details about your product or agency work into parts.
                        A paragraph describing a feature will be enough.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full md:w-4/12 px-4 text-center">
                  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                          <FaSwift className='text-black h-6 w-6'/>
                      </div>
                      <h6 class="text-xl font-semibold">Fast and Reliable</h6>
                      <p class="mt-2 mb-4 text-blueGray-500">
                        Keep you user engaged by providing meaningful information.
                        Remember that by this time, the user is curious.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="pt-6 w-full md:w-4/12 px-4 text-center">
                  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                          <FaLock/>
                      </div>
                      <h6 class="text-xl font-semibold">Secure</h6>
                      <p class="mt-2 mb-4 text-blueGray-500">
                        Write a few lines about each one. A paragraph describing a
                        feature will be enough. Keep you user engaged!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
               <footer class="relative  pt-8 pb-6 mt-1">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-center md:justify-between justify-center">
          <div class="w-full md:w-6/12 px-4 mx-auto text-center">
            <div class="text-sm text-blueGray-500 font-semibold py-1">
              Made with <a href="https://www.blockgames.gg" class="text-blueGray-500 hover:text-gray-800" target="_blank">teamT</a> by <a href="https://github.com/samuel-extras" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> samuel-extras</a>.
            </div>
          </div>
        </div>
      </div>
    </footer>
          </section>
          </section>
  )
}

export default LandingPage