import { Avatar, AvatarImage } from "./ui/avatar";

interface BotAvatarProps{
    src: string;
}

const AiAvatar = ({src}:BotAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
        <AvatarImage className="object-cover" src={src} />
    </Avatar>
  )
}

export default AiAvatar