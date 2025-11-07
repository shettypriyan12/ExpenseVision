
"use client";

// import c from "./filler1.module.css";

export default function Filler1() {
    return (
        <>
            <section className="m-0
                                lg:px-[2%] lg:py-[5%]
                                xl:px-[14%] xl:py-[5%]
                                2xl:px-[22%] 2xl:py-[0%]">
                <h1 className="mb-[4%] 
                                text-4xl 2xl:text-5xl
                                font-[600] 
                                first-letter:uppercase" >financial freedom starts here</h1>
                <p className="mb-[3%] text-md 2xl:text-xl text-[#e0e7ff] font-[600] first-letter:uppercase">take control of your finances with detailed insights and personalize your budget </p>

                <div className="py-4">
                    <div className="flex py-3 gap-4 mt-0.5">
                        <span >
                            <h2 className="font-[700] text-sm 2xl:text-xl mt-1.5 mb-1.5 px-3 py-2.5 bg-[#ffffff33] rounded-[50%]">01</h2>
                        </span>
                        <div className="flex flex-col py-1">
                            <h3 className=" capitalize text-base 2xl:text-2xl font-[600]">smart expense tracking</h3>
                            <p className=" text-[#e0e7ff] text-sm 2xl:text-xl first-letter:uppercase">stay on top of your spending with clear insights.</p>
                        </div>
                    </div>

                    <div className="flex py-3 gap-4 mt-0.5">
                        <span >
                            <h2 className="font-[700] text-sm 2xl:text-xl mt-1.5 mb-1.5 px-3 py-2.5 bg-[#ffffff33] rounded-[50%]">02</h2>
                        </span>
                        <div className="flex flex-col py-1">
                            <h3 className=" capitalize text-base 2xl:text-2xl font-[600]">personalized financial goals</h3>
                            <p className=" text-[#e0e7ff] text-sm 2xl:text-xl first-letter:uppercase">set and achieve your financial goals with AI-guided plans.</p>
                        </div>
                    </div>

                    <div className="flex py-3 gap-4 mt-0.5">
                        <span >
                            <h2 className="font-[700] text-sm 2xl:text-xl mt-1.5 mb-1.5 px-3 py-2.5 bg-[#ffffff33] rounded-[50%]">03</h2>
                        </span>
                        <div className="flex flex-col py-1">
                            <h3 className=" capitalize text-base 2xl:text-2xl font-[600]">intelligent budget tracking</h3>
                            <p className=" text-[#e0e7ff] text-sm 2xl:text-xl first-letter:uppercase">monitor your spending and save more with smart budgeting tools.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
