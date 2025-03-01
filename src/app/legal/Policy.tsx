import { Footer } from "../sections/footer"
import { Header } from "../sections/header"
import { PolicyData } from "./PolicyInterface"


type PolicyProps = {
    data: PolicyData
}

export default function Policy({ data }: PolicyProps) {
    return (
        <>
            <Header hideNav={true} />
            <div className="min-h-screen py-16 items-center w-full flex justify-center">
                <div className="w-full md:w-2/3 flex flex-col text-justify items-center px-6">
                    <h1 className="text-3xl font-semibold">{data.title}</h1>
                    <ol className="text-xl font-semibold">
                        {data.data.map((section, i) => (
                            <li key={i}>
                                <h2 className=" pt-5 pb-1">{section.title}</h2>
                                <ul className="font-normal text-sm">
                                    {section.bullet.map((bullet, y) => (
                                        <li key={y}>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <Footer />
        </>
    )
}