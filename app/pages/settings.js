import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import React, { useState, useEffect } from "react";

export default function Settings({}) {

    const [inputEmail, setInputEmail] = useState("");
    const [inputHandle, setInputHandle] = useState("");

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        // Your custom logic here
        console.log("Submitted: " + inputEmail);
    };

    const handleSubmitHandle = (e) => {
        e.preventDefault();
        // Your custom logic here
        console.log("Submitted: " + inputHandle);
    };

    return (
        <Layout>
            <div className={styles.container}>
                <h2 className="ml-10 mt-20 z-50 font-bold text-4xl">Settings</h2>
                <div className = "ml-10 mt-9 block">
                    <div className="inline-block w-20 p-4 space-x-10 items-start flex-shrink-0 rounded-full bg-green-300 bg-opacity-25 shadow-md">
                        <p className='text-center'>User</p>
                    </div>
                </div>
            
                <div className='m-10 flex-grow rounded-[1.5rem] bg-[#1F1D2B]'>
                    <p className='ml-10 mt-[3rem] font-medium text-3xl'>Method of Receiving Notifications</p>
                    <form
                        onSubmit={handleSubmitEmail}
                        className="flex flex-col gap-2"
                        >
                        <input
                            type="text"
                            className="m-10 h-[3.4rem] px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
                            placeholder="Enter Email Address"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="ml-10 h-[3rem] w-[17rem] px-4 flex items-center border-2 border-gray-700 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
                        >
                            Register For Email Notifications
                        </button>
                    </form>

                    <form
                        onSubmit={handleSubmitHandle}
                        className="flex flex-col gap-2"
                        >
                        <input
                            type="text"
                            className="m-10 h-[3.4rem] px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
                            placeholder="Enter Telegram Handle"
                            value={inputHandle}
                            onChange={(e) => setInputHandle(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="ml-10 mb-10 h-[3rem] w-[19rem] px-4 flex items-center border-2 border-gray-700 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
                        >
                            Register For Telegram Notifications
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};