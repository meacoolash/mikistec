import Image from "next/image"

export const ProfilePic = () => {
    return (
        <Image src={'/profile.jpeg'} alt={'Miki Stec profile picture'} width="150" height="150" className="rounded-full shadow-gray-400 shadow-md  object-cover" />
    )
}